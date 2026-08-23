import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import "@/models/Country";

const RELATED_FIELDS =
  "name slug banner_url city fees duration establishment_year ranking exams fees_structure.courses country_ref is_active";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const currentCollege = await College.findOne({ slug, is_active: true })
      .select("_id country_ref")
      .lean();

    if (!currentCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    const countryId =
      currentCollege.country_ref instanceof Types.ObjectId
        ? currentCollege.country_ref
        : currentCollege.country_ref
          ? new Types.ObjectId(String(currentCollege.country_ref))
          : undefined;

    let relatedColleges = await College.find({
      _id: { $ne: currentCollege._id },
      ...(countryId ? { country_ref: countryId } : {}),
      is_active: true,
    })
      .select(RELATED_FIELDS)
      .populate("country_ref", "name slug flag")
      .limit(6)
      .sort({ createdAt: -1 })
      .lean();

    if (relatedColleges.length < 3) {
      const additionalColleges = await College.find({
        _id: {
          $nin: [
            currentCollege._id,
            ...relatedColleges.map((c) => c._id),
          ],
        },
        ...(countryId ? { country_ref: { $ne: countryId } } : {}),
        is_active: true,
      })
        .select(RELATED_FIELDS)
        .populate("country_ref", "name slug flag")
        .limit(6 - relatedColleges.length)
        .sort({ createdAt: -1 })
        .lean();

      relatedColleges = [...relatedColleges, ...additionalColleges];
    }

    const response = NextResponse.json({
      success: true,
      message: "Related colleges fetched successfully",
      data: relatedColleges,
    });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=900"
    );
    response.headers.set("CDN-Cache-Control", "public, s-maxage=900");
    response.headers.set("Vercel-CDN-Cache-Control", "public, s-maxage=900");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch related colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
