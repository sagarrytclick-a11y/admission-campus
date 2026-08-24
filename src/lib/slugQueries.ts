import { cache } from "react";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import "@/models/Country";

/** Deduped per-request — metadata + page share one DB query */
export const getCollegeBySlug = cache(async (slug: string) => {
  await connectDB();
  return College.findOne({ slug, is_active: true })
    .populate("country_ref", "name slug flag")
    .lean();
});

export const getExamBySlug = cache(async (slug: string) => {
  await connectDB();
  const Exam = (await import("@/models/Exam")).default;
  return Exam.findOne({ slug, is_active: true }).lean();
});

export const getBlogBySlug = cache(async (slug: string) => {
  await connectDB();
  const Blog = (await import("@/models/Blog")).default;
  return Blog.findOne({ slug, is_active: true }).lean();
});
