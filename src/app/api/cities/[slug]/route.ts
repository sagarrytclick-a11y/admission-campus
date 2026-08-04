import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";
// Required for populate('country_ref') on serverless cold starts
import "@/models/Country";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const city = await City.findOne({ slug, is_active: true })
      .populate("country_ref", "name slug")
      .lean();

    if (!city) {
      return NextResponse.json(
        {
          success: false,
          message: "City not found",
        },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "City fetched successfully",
      data: city,
    });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Error fetching city by slug:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch city",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
