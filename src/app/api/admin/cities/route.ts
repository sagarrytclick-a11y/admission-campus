import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";
// Required for populate('country_ref') on serverless cold starts
import "@/models/Country";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Parse pagination and search parameters
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const rawLimit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const limit = Math.min(Math.max(rawLimit, 1), 1000);
    const search = searchParams.get('search') || '';
    const exactSlug = searchParams.get('slug') || '';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Exact slug match takes priority over fuzzy search
    const searchQuery = exactSlug
      ? { slug: exactSlug }
      : search
        ? {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { slug: { $regex: search, $options: 'i' } }
            ]
          }
        : {};

    // Get total count for pagination info (with search filter)
    const totalCities = await City.countDocuments(searchQuery);

    // Fetch cities with pagination and search
    const cities = await City.find(searchQuery)
      .populate('country_ref', 'name slug')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate pagination info
    const totalPages = Math.ceil(totalCities / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      message: "Cities fetched successfully",
      data: cities,
      pagination: {
        currentPage: page,
        totalPages,
        totalCities,
        limit,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cities",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const {
      id,
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

    if (!id || !name || !slug || !country_ref || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const existingCity = await City.findOne({ $or: [{ id }, { slug }] });
    if (existingCity) {
      return NextResponse.json(
        {
          success: false,
          message: "City with this id or slug already exists",
        },
        { status: 409 }
      );
    }

    const city = new City({
      id,
      name,
      slug,
      country_ref: countryId,
      description,
      cityImage: cityImage || '',
      features: features || [],
      is_active: is_active !== undefined ? is_active : true,
    });

    await city.save();

    const populatedCity = await City.findById(city._id).populate('country_ref', 'name slug');

    return NextResponse.json({
      success: true,
      message: "City created successfully",
      data: populatedCity,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create city",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
