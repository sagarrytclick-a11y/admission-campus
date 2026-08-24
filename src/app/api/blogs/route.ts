import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

/** List payload — strip full HTML bodies (homepage / listing speed) */
const LIST_FIELDS = {
  title: 1,
  slug: 1,
  category: 1,
  tags: 1,
  image: 1,
  related_exams: 1,
  is_active: 1,
  createdAt: 1,
  updatedAt: 1,
  // First ~600 chars only — enough for card excerpts / read-time hint
  content: { $substrCP: [{ $ifNull: ["$content", ""] }, 0, 600] },
};

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const rawLimit = parseInt(searchParams.get("limit") || "24", 10) || 24;
    const limit = Math.min(Math.max(rawLimit, 1), 50);
    const skip = (page - 1) * limit;

    const match = { is_active: true };

    const [total, blogs] = await Promise.all([
      Blog.countDocuments(match),
      Blog.aggregate([
        { $match: match },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $project: LIST_FIELDS },
      ]),
    ]);

    const data = blogs.map((blog) => {
      const plain = String(blog.content || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return {
        ...blog,
        content: plain.slice(0, 280),
      };
    });

    const response = NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
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
        message: "Failed to fetch blogs",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
