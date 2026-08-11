import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";
import { handleApiError, validateRequiredFields, createSuccessResponse, ValidationError } from "@/lib/validation";
import { requireAdmin, isAdminAuthFailure } from "@/lib/requireAdmin";

export async function GET() {
  try {
  const auth = await requireAdmin();
  if (isAdminAuthFailure(auth)) return auth.error;

    
    await connectDB();
    
    const colleges = await College.find({}).populate('country_ref').sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: colleges,
    });
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

export async function POST(request: NextRequest) {
  try {
  const auth = await requireAdmin();
  if (isAdminAuthFailure(auth)) return auth.error;

    
    await connectDB();
    
    const body = await request.json();
    
    const { 
      name, 
      slug, 
      country_ref,
      city,
      exams,
      categories,
      // New comprehensive sections
      overview,
      key_highlights,
      why_choose_us,
      ranking,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      // Legacy fields for backward compatibility
      fees, 
      duration, 
      establishment_year,
      ranking: legacyRanking,
      banner_url, 
      about_content, 
      is_active 
    } = body;

    // Validation using utility
    validateRequiredFields(body, ['name', 'slug', 'country_ref']);
    
    // Validate that at least overview description is provided
    if (!overview?.description) {
      throw new ValidationError("Overview description is required");
    }

    // Find country by slug to get ObjectId
    const country = await Country.findOne({ slug: country_ref });
    if (!country) {
      
      // Get available countries for helpful error message
      const availableCountries = await Country.find({}).select('slug name flag');
      const countryList = availableCountries.map(c => `- ${c.slug} (${c.flag} ${c.name})`).join('\n');
      
      throw new ValidationError(
        "Country not found",
        {
          invalidCountry: country_ref,
          availableCountries: availableCountries,
          message: `Country with slug '${country_ref}' not found. Available countries:\n${countryList}`
        }
      );
    }

    // Validate city requirement for India
    if (country.name.toLowerCase() === 'india' && !city) {
      throw new ValidationError(
        "City is required for Indian colleges",
        { 
          country: country.name,
          requiredField: 'city',
          message: 'Please select a city for Indian colleges'
        }
      );
    }

    // Check if college with same slug already exists
    const existingCollege = await College.findOne({ slug });
    if (existingCollege) {
      throw new ValidationError(
        "College with this slug already exists",
        { existingSlug: slug, existingCollege: existingCollege.name }
      );
    }

    
    const college = new College({
      name,
      slug,
      country_ref: country._id, // Use the ObjectId from the found country
      city: city || undefined,
      exams: exams || [],
      categories: categories || [],
      
      // New comprehensive structure
      overview: overview || {
        title: "Overview",
        description: about_content || ""
      },
      key_highlights: key_highlights || {
        title: "Key Highlights",
        description: "",
        features: []
      },
      why_choose_us: why_choose_us || {
        title: "Why Choose Us",
        description: "",
        features: []
      },
      ranking: ranking || {
        title: "Ranking & Recognition",
        description: "",
        country_ranking: legacyRanking || "",
        world_ranking: "",
        accreditation: []
      },
      admission_process: admission_process || {
        title: "Admission Process",
        description: "",
        steps: []
      },
      documents_required: documents_required || {
        title: "Documents Required",
        description: "",
        documents: []
      },
      fees_structure: fees_structure || {
        title: "Fees Structure",
        description: "",
        courses: [{
          course_name: "Program",
          duration: duration || "N/A",
          annual_tuition_fee: fees ? `₹${fees.toLocaleString()}` : "N/A"
        }]
      },
      campus_highlights: campus_highlights || {
        title: "Campus Highlights",
        description: "",
        highlights: []
      },

      // Legacy fields for backward compatibility
      fees: fees ? Number(fees) : undefined,
      duration,
      establishment_year,
      banner_url: banner_url || "",
      about_content,
      
      is_active: is_active !== undefined ? is_active : true,
    });

    const savedCollege = await college.save();

    return createSuccessResponse(savedCollege, "College created successfully");
    
  } catch (error) {
    return handleApiError(error);
  }
}