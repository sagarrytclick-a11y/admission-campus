import { connectDB } from "@/lib/db";
import College from "@/models/College";

export async function getCollegeBySlug(slug: string): Promise<any | null> {
  try {
    
    await connectDB();

    const college = await College.findOne({ slug, is_active: true })
      .populate("country_ref")
      .lean();

    
    if (!college) {
      return null;
    }

    return {
      ...college,
      _id: college._id.toString(),

      createdAt: college.createdAt?.toISOString?.(),
      updatedAt: college.updatedAt?.toISOString?.(),

      country_ref: college.country_ref && typeof college.country_ref === 'object'
        ? {
            ...(college.country_ref as any),
            _id: (college.country_ref as any)._id.toString(),
            createdAt: (college.country_ref as any).createdAt?.toISOString?.(),
            updatedAt: (college.country_ref as any).updatedAt?.toISOString?.(),
          }
        : null,
    };
  } catch {
    
    throw new Error("Failed to fetch college data");
  }
}
