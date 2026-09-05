/**
 * Generates a URL-friendly slug from a given string
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Generates a unique slug by appending a number if the slug already exists
 */
export function generateUniqueSlug(
  baseText: string,
  existingSlugs: string[] = []
): string {
  let slug = generateSlug(baseText);
  let counter = 1;
  const originalSlug = slug;

  while (existingSlugs.includes(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Shared college slug — same rules for MD/MS, MBBS India, MBBS Abroad.
 * Uses name; on collision appends `-{id}`.
 */
export function makeUniqueEntitySlug(
  name: string,
  id: number | string,
  usedSlugs: Set<string>
): string {
  let slug = generateSlug(name) || `item-${id}`;
  if (usedSlugs.has(slug)) slug = `${slug}-${id}`;
  usedSlugs.add(slug);
  return slug;
}

/**
 * Shared region slug (state / country) — always from display name.
 */
export function makeRegionSlug(name: string, id?: number | string): string {
  return generateSlug(name) || (id != null ? String(id) : "region");
}
