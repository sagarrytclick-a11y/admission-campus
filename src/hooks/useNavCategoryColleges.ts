"use client";

import { useQuery } from "@tanstack/react-query";

export type NavApiCollege = {
  _id: string;
  name: string;
  slug: string;
  city?: string;
  categories?: string[];
};

async function fetchCategoryColleges(
  category: string
): Promise<NavApiCollege[]> {
  const params = new URLSearchParams({
    category,
    limit: "40",
  });
  const response = await fetch(`/api/colleges?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Failed to fetch colleges");
  }
  return result.data?.colleges || [];
}

export function useNavCategoryColleges(category: string, enabled: boolean) {
  return useQuery({
    queryKey: ["nav-category-colleges", category],
    queryFn: () => fetchCategoryColleges(category),
    enabled,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
