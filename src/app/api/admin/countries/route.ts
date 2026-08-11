import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import { requireAdmin, isAdminAuthFailure } from "@/lib/requireAdmin";

export async function GET() {
  try {
  const auth = await requireAdmin();
  if (isAdminAuthFailure(auth)) return auth.error;

    await connectDB();
    const countries = await Country.find({}).sort({ name: 1 });
    
    return NextResponse.json({
      success: true,
      message: "Countries fetched successfully",
      data: countries,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch countries",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
  const auth = await requireAdmin();
  if (isAdminAuthFailure(auth)) return auth.error;

    await connectDB();
    const body = await request.json();

    const { name, slug, flag, description, meta_title, meta_description, is_active } = body;

    if (!name || !slug || !flag || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, slug, flag, description",
        },
        { status: 400 }
      );
    }

    const existingCountry = await Country.findOne({ slug });
    if (existingCountry) {
      return NextResponse.json(
        {
          success: false,
          message: "Country with this slug already exists",
        },
        { status: 409 }
      );
    }

    const country = new Country({
      name,
      slug,
      flag,
      description,
      meta_title,
      meta_description,
      is_active: is_active !== undefined ? is_active : true,
    });

    await country.save();

    return NextResponse.json({
      success: true,
      message: "Country created successfully",
      data: country,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create country",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
