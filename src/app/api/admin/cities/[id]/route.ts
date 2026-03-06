import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params;

    const {
      name,
      slug,
      country_ref,
      description,
      cityImage,
      features,
      is_active
    } = body;

    // Extract country ObjectId from the object
    const countryId = typeof country_ref === 'object' && country_ref._id ? country_ref._id : country_ref;

    // Validate required fields
    if (!name || !slug || !country_ref || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, slug, country_ref, description",
        },
        { status: 400 }
      );
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        country_ref: countryId,
        description,
        cityImage: cityImage || '',
        features: features || [],
        is_active: is_active !== undefined ? is_active : true,
      },
      { new: true, runValidators: true }
    ).populate('country_ref', 'name slug');

    if (!updatedCity) {
      return NextResponse.json(
        {
          success: false,
          message: "City not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "City updated successfully",
      data: updatedCity,
    });
  } catch (error) {
    console.error("Error updating city:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update city",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity) {
      return NextResponse.json(
        {
          success: false,
          message: "City not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "City deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting city:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete city",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
