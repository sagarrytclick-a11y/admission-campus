import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";
import { generateSlug } from "@/lib/slug";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const countrySlug = searchParams.get('country');
    const exam = searchParams.get('exam');
    const category = searchParams.get('category');
    
    const skip = (page - 1) * limit;
    
    // Build query
    const query: Record<string, unknown> = { is_active: true };
    
    // Search by name or about content
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { about_content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by country
    if (countrySlug && countrySlug !== 'all') {
      const country = await Country.findOne({ slug: countrySlug, is_active: true });
      if (country) {
        query.country_ref = country._id;
      } else {
        return NextResponse.json({
          success: true,
          message: "Colleges fetched successfully",
          data: { colleges: [], total: 0 },
        });
      }
    }
    
    // Filter by exam
    if (exam && exam !== 'all') {
      query.exams = { $in: [exam] };
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.categories = { $in: [category] };
    }
    
    // Get total count for pagination
    const total = await College.countDocuments(query);
    
    // Fetch paginated results
    const colleges = await College.find(query)
      .populate('country_ref', 'name slug flag')
      .sort({ ranking: 1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance
    
    const response = NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: {
        colleges,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: skip + limit < total
      },
    });
    
    // Add caching headers
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=180, stale-while-revalidate=300'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=300');
    
    return response;
  } catch (error) {
    console.error("Error fetching colleges:", error);
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
      establishment_year
    } = body;

    // Generate slug from name
    const slug = generateSlug(name);

    // Check if college with same slug already exists
    const existingCollege = await College.findOne({ slug });
    if (existingCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College with this name already exists",
        },
        { status: 400 }
      );
    }

    // Validate city requirement for India
    if (country_ref) {
      const country = await Country.findById(country_ref);
      if (country && country.name.toLowerCase() === 'india' && !city) {
        return NextResponse.json(
          {
            success: false,
            message: "City is required for Indian colleges",
          },
          { status: 400 }
        );
      }
    }

    // Create new college
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
      establishment_year
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
    console.error("Error creating college:", error);
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
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "College ID is required",
        },
        { status: 400 }
      );
    }

    // Generate new slug if name is being updated
    if (updateData.name) {
      updateData.slug = generateSlug(updateData.name);
    }

    // Validate city requirement for India if country is being updated
    if (updateData.country_ref || updateData.city !== undefined) {
      const countryId = updateData.country_ref || id;
      const country = await Country.findById(countryId);
      if (country && country.name.toLowerCase() === 'india' && !updateData.city) {
        // Check if existing college has city
        const existingCollege = await College.findById(id);
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

    const updatedCollege = await College.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('country_ref', 'name slug flag');

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
    console.error("Error updating college:", error);
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
