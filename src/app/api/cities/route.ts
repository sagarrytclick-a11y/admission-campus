import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import City from "@/models/City";
import Country from "@/models/Country";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const rawLimit = parseInt(searchParams.get("limit") || "100", 10) || 100;
    const limit = Math.min(Math.max(rawLimit, 1), 1000);
    const countrySlug = searchParams.get("country") || "";
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { is_active: true };

    if (countrySlug) {
      const country = await Country.findOne({
        slug: countrySlug,
        is_active: true,
      }).select("_id");

      if (!country) {
        return NextResponse.json({
          success: true,
          message: "Cities fetched successfully",
          data: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalCities: 0,
            limit,
            hasNextPage: false,
            hasPrevPage: false,
          },
        });
      }

      query.country_ref = country._id;
    }

    const [totalCities, cities] = await Promise.all([
      City.countDocuments(query),
      City.find(query)
        .populate("country_ref", "name slug")
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const response = NextResponse.json({
      success: true,
      message: "Cities fetched successfully",
      data: cities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCities / limit) || 1,
        totalCities,
        limit,
        hasNextPage: page * limit < totalCities,
        hasPrevPage: page > 1,
      },
    });

    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Error fetching cities:", error);
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
