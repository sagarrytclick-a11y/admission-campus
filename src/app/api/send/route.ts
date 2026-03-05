// app/api/send/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { EMAIL_CONFIG } from '@/config/email-config';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log('=== SEND ROUTE CALLED ===');
    const body = await req.json();
    console.log('Request body:', body);
    const { name, email, number, city } = body;
    console.log('Extracted data:', { name, email, number, city });

    // Validate required fields
    if (!name || !email || !number || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Save enquiry to database
    const enquiry = new Enquiry({
      name,
      email,
      phone: number,
      city,
      subject: `Contact Form Enquiry from ${city}`,
      message: `New enquiry received from ${name} via contact form.`,
      source: 'contact-form'
    });

    await enquiry.save();

    // Send email notification
    try {
      console.log('=== ATTEMPTING TO SEND EMAIL ===');
      console.log('From:', 'Admission Campus <onboarding@resend.dev>');
      console.log('To:', [process.env.ADMIN_EMAIL || 'sagar.rytclick@gmail.com']);
      console.log('Subject:', `New Enquiry from ${name}`);

      const data = await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's verified domain for testing
        to: [process.env.ADMIN_EMAIL || 'sagar.rytclick@gmail.com'], // Use account owner's email for testing
        subject: `New Enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #104bc1ff; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Contact Information:</h3>
              
              <p style="margin: 10px 0;">
                <strong>Name:</strong> ${name}
              </p>
              
              <p style="margin: 10px 0;">
                <strong>Email:</strong> <a href="mailto:${email}" style="color: #10b981;">${email}</a>
              </p>
              
              <p style="margin: 10px 0;">
                <strong>Phone Number:</strong> ${number}
              </p>
              
              <p style="margin: 10px 0;">
                <strong>City:</strong> ${city}
              </p>
            </div>
            
            <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;">
                <strong>Submission Time:</strong> ${new Date().toLocaleString()}
              </p>
              <p style="margin: 5px 0 0 0; color: #065f46;">
                <strong>Enquiry ID:</strong> ${enquiry._id}
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 30px;">
              This email was sent from Admission Campus contact form.
            </p>
          </div>
        `,
      });
      console.log('=== EMAIL SENT SUCCESSFULLY ===');
      console.log('Resend response:', data);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - the enquiry is saved in database
    }

    return NextResponse.json({ 
      message: 'Enquiry submitted successfully', 
      data: {
        enquiryId: enquiry._id,
        emailSent: true
      }
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}