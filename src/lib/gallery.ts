import fs from "node:fs";
import path from "node:path";

export type GalleryImage = {
  src: string;
  alt: string;
};

const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => exts.has(path.extname(f).toLowerCase()));

  return files.map((file) => ({
    src: `/gallery/${encodeURIComponent(file)}`,
    alt: "Bartlett’s Café",
  }));
}

