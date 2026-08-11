import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_FOLDERS = new Set(['colleges', 'blogs', 'exams', 'cities', 'categories', 'general']);
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);
const MAX_SIZE = 5 * 1024 * 1024;

function sanitizeFolder(folder: string): string {
  const cleaned = folder.replace(/[^a-zA-Z0-9_-]/g, '');
  if (!ALLOWED_FOLDERS.has(cleaned)) {
    throw new Error('Invalid upload folder');
  }
  return cleaned;
}

function sanitizeFilename(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '_');
  const ext = path.extname(base).toLowerCase();
  const allowedExt = ['.jpg', '.jpeg', '.png', '.webp'];
  if (!allowedExt.includes(ext)) {
    throw new Error('Invalid file extension');
  }
  return base.slice(0, 100);
}

export function validateImage(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'Image size must be less than 5MB' };
  }

  return { valid: true };
}

export async function uploadImage(file: File, folder: string = 'colleges'): Promise<string> {
  const validation = validateImage(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid image');
  }

  const safeFolder = sanitizeFolder(folder);
  const safeName = sanitizeFilename(file.name);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', safeFolder);
  await mkdir(uploadsDir, { recursive: true });

  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const filename = `${timestamp}-${randomString}-${safeName}`;
  const filepath = path.join(uploadsDir, filename);

  // Ensure resolved path stays inside uploads dir (path traversal guard)
  const resolved = path.resolve(filepath);
  if (!resolved.startsWith(path.resolve(uploadsDir) + path.sep)) {
    throw new Error('Invalid upload path');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(resolved, buffer);

  return `/uploads/${safeFolder}/${filename}`;
}

export async function uploadMultipleImages(files: File[], folder: string = 'colleges'): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}
