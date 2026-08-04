import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();
    
    // For admin, get ALL categories (both active and inactive)
    const categories = await Category.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      message: "Admin categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching admin categories:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admin categories",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Category slug is required",
        },
        { status: 400 }
      );
    }

    // For admin, do a HARD delete - actually remove from database
    const category = await Category.findOneAndDelete({ slug });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category permanently deleted from database",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete category",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
