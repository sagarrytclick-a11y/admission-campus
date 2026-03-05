import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import { generateSlug, generateUniqueSlug } from "@/lib/slug";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({ is_active: true })
      .sort({ createdAt: -1 })
      .lean();

    const response = NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });

    // Add caching headers
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    );

    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, description, image } = body;

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, description",
        },
        { status: 400 }
      );
    }

    // Clean input
    const cleanName = name.trim();
    const cleanDescription = description.trim();
    const cleanImage = image ? image.trim() : "";

    if (!cleanName || !cleanDescription) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and description cannot be empty",
        },
        { status: 400 }
      );
    }

    // Generate slug from name
    let slug = generateSlug(cleanName);

    // Check if category with this slug already exists and generate unique slug if needed
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      // Get all existing slugs to generate a unique one
      const allCategories = await Category.find({}).select('slug').lean();
      const existingSlugs = allCategories.map(cat => cat.slug);
      slug = generateUniqueSlug(cleanName, existingSlugs);
    }

    const category = new Category({
      name: cleanName,
      slug,
      description: cleanDescription,
      image: cleanImage,
    });

    await category.save();

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error: any) {
    console.error("Error creating category:", error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A category with this identifier already exists. Please try a different name.",
          error: "Duplicate entry",
          details: error.keyPattern,
        },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { slug, name, description, image, is_active } = body;

    // Validate required fields
    if (!slug || !name || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: slug, name, description",
        },
        { status: 400 }
      );
    }

    // Generate new slug from name if name changed
    const newSlug = generateSlug(name);

    const category = await Category.findOneAndUpdate(
      { slug },
      {
        name: name.trim(),
        slug: newSlug,
        description: description.trim(),
        image: image ? image.trim() : "",
        is_active: is_active !== undefined ? is_active : true,
      },
      { new: true }
    );

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
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category",
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

    // Soft delete by setting is_active to false
    const category = await Category.findOneAndUpdate(
      { slug },
      { is_active: false },
      { new: true }
    );

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
      message: "Category deleted successfully",
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
