import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";
// Keep Country registered for any populate/ref edge cases on cold starts
import "@/models/Country";

const EXAM_LIST_FIELDS =
  "name slug short_name exam_type exam_mode conducting_body exam_dates is_active display_order createdAt updatedAt";

export async function GET() {
  try {
    await connectDB();

    const exams = await Exam.find({ is_active: true })
      .select(EXAM_LIST_FIELDS)
      .sort({ display_order: 1, createdAt: -1 })
      .lean();

    const response = NextResponse.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );
    response.headers.set("CDN-Cache-Control", "public, s-maxage=600");
    response.headers.set("Vercel-CDN-Cache-Control", "public, s-maxage=600");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exams",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
