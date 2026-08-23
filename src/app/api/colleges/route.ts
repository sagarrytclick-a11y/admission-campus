import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import { requireAdmin, isAdminAuthFailure } from "@/lib/requireAdmin";
// Required for populate('country_ref') on serverless cold starts
import Country from "@/models/Country";
import { generateSlug } from "@/lib/slug";
import { escapeRegex, sanitizeSearchTerm } from "@/lib/security";

/** Card/list fields — avoids shipping full overview blobs on listing APIs */
const LIST_FIELDS =
  "name slug banner_url city exams categories fees duration establishment_year ranking fees_structure.courses is_active country_ref createdAt updatedAt";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    // sitemap=1 allows up to 1000 slim records; normal clients capped at 50
    const forSitemap = searchParams.get("sitemap") === "1";
    const rawLimit = parseInt(searchParams.get("limit") || "12", 10) || 12;
    const limit = forSitemap
      ? Math.min(rawLimit, 1000)
      : Math.min(rawLimit, 50);
    const search = sanitizeSearchTerm(searchParams.get("search"));
    const countrySlug = searchParams.get("country");
    const exam = searchParams.get("exam");
    const category = searchParams.get("category");
    const city = searchParams.get("city");

    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { is_active: true };

    if (search) {
      const safeSearch = escapeRegex(search);
      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { about_content: { $regex: safeSearch, $options: "i" } },
      ];
    }

    if (countrySlug && countrySlug !== "all") {
      const country = await Country.findOne({
        slug: countrySlug,
        is_active: true,
      })
        .select("_id")
        .lean();
      if (country) {
        query.country_ref = country._id;
      } else {
        return NextResponse.json({
          success: true,
          message: "Colleges fetched successfully",
          data: {
            colleges: [],
            total: 0,
            page,
            limit,
            totalPages: 0,
            hasNext: false,
          },
        });
      }
    }

    if (exam && exam !== "all") {
      query.exams = { $in: [exam] };
    }

    if (category && category !== "all") {
      query.categories = { $in: [category] };
    }

    if (city && city !== "all") {
      query.city = {
        $regex: new RegExp(
          `^${city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
          "i"
        ),
      };
    }

    // Parallel count + find (biggest list latency win)
    const [total, colleges] = await Promise.all([
      College.countDocuments(query),
      College.find(query)
        .select(LIST_FIELDS)
        .populate("country_ref", "name slug flag")
        .sort({ ranking: 1, name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const response = NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: {
        colleges,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: skip + limit < total,
      },
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
        message: "Failed to fetch colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if (isAdminAuthFailure(auth)) return auth.error;

    await connectDB();
    const body = await request.json();

    const {
      name,
      country_ref,
      city,
      exams = [],
      categories = [],
      overview,
      key_highlights,
      why_choose_us,
      ranking_section,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      banner_url,
      is_active = true,
      establishment_year,
    } = body;

    const slug = generateSlug(name);

    const existingCollege = await College.findOne({ slug }).select("_id").lean();
    if (existingCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College with this name already exists",
        },
        { status: 400 }
      );
    }

    if (country_ref) {
      const country = await Country.findById(country_ref).select("name").lean();
      if (country && country.name.toLowerCase() === "india" && !city) {
        return NextResponse.json(
          {
            success: false,
            message: "City is required for Indian colleges",
          },
          { status: 400 }
        );
      }
    }

    const newCollege = new College({
      name,
      slug,
      country_ref,
      city,
      exams,
      categories,
      overview,
      key_highlights,
      why_choose_us,
      ranking: ranking_section,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      banner_url,
      is_active,
      establishment_year,
    });

    await newCollege.save();

    return NextResponse.json(
      {
        success: true,
        message: "College created successfully",
        data: newCollege,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create college",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAdmin();
    if (isAdminAuthFailure(auth)) return auth.error;

    await connectDB();
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "College ID is required",
        },
        { status: 400 }
      );
    }

    const allowedKeys = [
      "name",
      "country_ref",
      "city",
      "exams",
      "categories",
      "overview",
      "key_highlights",
      "why_choose_us",
      "ranking_section",
      "ranking",
      "admission_process",
      "documents_required",
      "fees_structure",
      "campus_highlights",
      "banner_url",
      "is_active",
      "establishment_year",
      "about_content",
    ] as const;

    const updateData: Record<string, unknown> = {};
    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    if (
      updateData.ranking_section !== undefined &&
      updateData.ranking === undefined
    ) {
      updateData.ranking = updateData.ranking_section;
      delete updateData.ranking_section;
    }

    if (typeof updateData.name === "string") {
      updateData.slug = generateSlug(updateData.name);
    }

    if (updateData.country_ref || updateData.city !== undefined) {
      const countryId = updateData.country_ref;
      const country = countryId
        ? await Country.findById(countryId).select("name").lean()
        : null;
      if (country && country.name.toLowerCase() === "india" && !updateData.city) {
        const existingCollege = await College.findById(id).select("city").lean();
        if (!existingCollege?.city) {
          return NextResponse.json(
            {
              success: false,
              message: "City is required for Indian colleges",
            },
            { status: 400 }
          );
        }
      }
    }

    const updatedCollege = await College.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("country_ref", "name slug flag");

    if (!updatedCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "College updated successfully",
        data: updatedCollege,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update college",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
