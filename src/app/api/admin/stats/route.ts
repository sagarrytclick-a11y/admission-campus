import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import College from "@/models/College";
import Blog from "@/models/Blog";
import Exam from "@/models/Exam";
import { requireAdmin, isAdminAuthFailure } from "@/lib/requireAdmin";

export async function GET() {
  try {
  const auth = await requireAdmin();
  if (isAdminAuthFailure(auth)) return auth.error;

    
    await connectDB();
    
    
    // Get counts from all collections in parallel for better performance
    const [countriesCount, collegesCount, blogsCount, examsCount] = await Promise.all([
      Country.countDocuments({}),
      College.countDocuments({}),
      Blog.countDocuments({}),
      Exam.countDocuments({})
    ]);
    
    const statsData = {
      countries: countriesCount,
      colleges: collegesCount,
      blogs: blogsCount,
      exams: examsCount
    };
    
    
    return NextResponse.json({
      success: true,
      message: "Stats fetched successfully",
      data: statsData,
    });
  } catch (error) {
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
