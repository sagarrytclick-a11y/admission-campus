import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
} from '@/lib/security';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(key);
}

const SEND_WINDOW_MS = 15 * 60 * 1000;
const SEND_MAX = 8;

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`send:${ip}`, SEND_MAX, SEND_WINDOW_MS);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rate.retryAfterSec) },
        }
      );
    }

    const body = await req.json();
    const { name, email, number, city, course_category } = body;

    if (!name || !email || !number || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof number !== 'string' ||
      typeof city !== 'string' ||
      name.length > 120 ||
      email.length > 200 ||
      number.length > 30 ||
      city.length > 100
    ) {
      return NextResponse.json(
        { error: 'Invalid field length or type' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const validCourseCategories = ['Medical', 'Management', 'Law', 'Design', 'Engineering', 'Online MBA'];
    if (course_category && !validCourseCategories.includes(course_category)) {
      return NextResponse.json(
        { error: 'Invalid course category' },
        { status: 400 }
      );
    }

    await connectDB();

    const enquiry = new Enquiry({
      name,
      email,
      phone: number,
      city,
      course_category: course_category || null,
      subject: course_category
        ? `Contact Form Enquiry from ${city} - ${course_category}`
        : `Contact Form Enquiry from ${city}`,
      message: course_category
        ? `New enquiry received from ${name} via contact form. Interested in: ${course_category}`
        : `New enquiry received from ${name} via contact form.`,
      source: 'contact-form'
    });

    await enquiry.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && process.env.RESEND_API_KEY) {
      try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeNumber = escapeHtml(number);
        const safeCity = escapeHtml(city);
        const safeCategory = course_category ? escapeHtml(course_category) : '';

        await getResend().emails.send({
          from: 'onboarding@resend.dev',
          to: [adminEmail],
          subject: `New Enquiry from ${name.slice(0, 80)}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #104bc1ff; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Contact Information:</h3>
                
                <p style="margin: 10px 0;">
                  <strong>Name:</strong> ${safeName}
                </p>
                
                <p style="margin: 10px 0;">
                  <strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #10b981;">${safeEmail}</a>
                </p>
                
                <p style="margin: 10px 0;">
                  <strong>Phone Number:</strong> ${safeNumber}
                </p>
                
                <p style="margin: 10px 0;">
                  <strong>City:</strong> ${safeCity}
                </p>
                
                ${safeCategory ? `
                <p style="margin: 10px 0;">
                  <strong>Course Category:</strong> ${safeCategory}
                </p>` : ''}
              </div>
              
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46;">
                  <strong>Submission Time:</strong> ${escapeHtml(new Date().toLocaleString())}
                </p>
                <p style="margin: 5px 0 0 0; color: #065f46;">
                  <strong>Enquiry ID:</strong> ${escapeHtml(String(enquiry._id))}
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
                This email was sent from Admission Campus contact form.
              </p>
            </div>
          `,
        });
      } catch {
        // Enquiry already saved; do not fail the request on email errors
      }
    }

    return NextResponse.json({
      message: 'Enquiry submitted successfully',
      data: {
        enquiryId: enquiry._id,
      }
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
