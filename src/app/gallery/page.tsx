import { Container } from "@/components/container";
import Image from "next/image";
import { getGalleryImages, type GalleryImage } from "@/lib/gallery";

type GalleryImageWithSize = GalleryImage & {
  size: "small" | "medium" | "tall";
};

export default function GalleryPage() {
  const rawImages = getGalleryImages();

  const sizePattern: GalleryImageWithSize["size"][] = [
    "tall",
    "small",
    "medium",
    "small",
    "tall",
    "medium",
    "small",
    "tall",
    "medium",
    "small",
  ];

  const images: GalleryImageWithSize[] = rawImages.map((img, i) => ({
    ...img,
    size: sizePattern[i % sizePattern.length],
  }));

  // Duplicate images for seamless infinite scroll
  const scrollImages = [...images, ...images, ...images];

  const sizeClasses = {
    small: "h-40",
    medium: "h-64",
    tall: "h-80",
  };

  // Height mapping for masonry images (mobile)
  const masonryHeights = {
    small: 160,
    medium: 256,
    tall: 320,
  };

  return (
    <div className="surface min-h-screen">
      {/* Hero Section */}
      <div className="lg:grid lg:grid-cols-2 min-h-[50vh] overflow-hidden">
          {/* Left Side - Title Section */}
          <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-8">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif italic tracking-tight">
              Gallery
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-zinc-600 max-w-md">
              More than just a café, Bartlett's is a place where moments are
              captured, memories are made, and every cup tells a story.
            </p>

            {/* Signature */}
            <div className="mt-12">
              <svg
                viewBox="0 0 200 60"
                className="h-16 w-auto"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M10 45 C30 45, 40 30, 50 25 C60 20, 70 25, 80 30 C90 35, 100 40, 110 35 C120 30, 130 20, 140 25 C150 30, 160 45, 180 45"
                  className="text-zinc-800"
                />
              </svg>
            </div>

            {/* Vertical line */}
            <div className="mt-8">
              <div className="w-px h-16 bg-gradient-to-b from-zinc-400 to-transparent" />
            </div>
          </div>

          {/* Right Side - Scrolling Image Grid - hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block relative overflow-hidden bg-zinc-900 h-full">
            <div className="absolute inset-0 flex justify-center gap-3 p-3">
              {/* Column 1 - Scroll Down */}
              <div className="flex flex-col gap-3 animate-scroll-down">
                {scrollImages.filter((_, i) => i % 3 === 0).map((img, index) => (
                  <div
                    key={`col1-${index}`}
                    className={`
                      relative overflow-hidden rounded-2xl
                      ${sizeClasses[img.size]} w-40 flex-shrink-0
                      bg-gradient-to-br from-zinc-800 to-zinc-700
                    `}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="160px"
                      className="object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 - Scroll Up */}
              <div className="flex flex-col gap-3 animate-scroll-up">
                {scrollImages.filter((_, i) => i % 3 === 1).map((img, index) => (
                  <div
                    key={`col2-${index}`}
                    className={`
                      relative overflow-hidden rounded-2xl
                      ${sizeClasses[img.size]} w-40 flex-shrink-0
                      bg-gradient-to-br from-zinc-800 to-zinc-700
                    `}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="160px"
                      className="object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>

              {/* Column 3 - Scroll Down */}
              <div className="flex flex-col gap-3 animate-scroll-down">
                {scrollImages.filter((_, i) => i % 3 === 2).map((img, index) => (
                  <div
                    key={`col3-${index}`}
                    className={`
                      relative overflow-hidden rounded-2xl
                      ${sizeClasses[img.size]} w-40 flex-shrink-0
                      bg-gradient-to-br from-zinc-800 to-zinc-700
                    `}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="160px"
                      className="object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Gallery Grid Section - Masonry Layout */}
        <Container>
          {images.length > 0 && (
          <div className="py-12 sm:py-24">
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8 sm:mb-12">
              All Moments
            </h2>

            {/* Mobile: True masonry with CSS columns (2 columns, staggered) */}
            <div className="lg:hidden columns-2 gap-3">
              {images.map((img, index) => (
                <div
                  key={img.src}
                  className={`
                    break-inside-avoid mb-3
                    group relative overflow-hidden rounded-2xl
                    bg-gradient-to-br from-zinc-800 to-zinc-700
                    shadow-md
                  `}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={180}
                    height={masonryHeights[img.size]}
                    sizes="(max-width: 768px) 50vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Tablet/Desktop: Original grid layout preserved */}
            <div className="hidden lg:grid grid-cols-4 gap-4 auto-rows-[200px]">
              {images.map((img, index) => (
                <div
                  key={img.src}
                  className={`
                    group relative overflow-hidden rounded-3xl
                    bg-gradient-to-br from-zinc-100 to-zinc-200
                    shadow-md transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-amber-500/20
                    ${img.size === "tall" ? "row-span-2" : ""}
                  `}
                  style={{
                    gridRow: img.size === "tall" ? "span 2" : "auto",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1200px) 25vw, 20vw"
                    className="
                      object-cover transition-transform duration-700 ease-out
                      group-hover:scale-110
                    "
                  />
                  <div className="
                    absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  " />
                  <div className="
                    absolute bottom-0 left-0 right-0 p-4
                    translate-y-full group-hover:translate-y-0
                    transition-transform duration-500 ease-out
                  ">
                    <p className="text-white text-sm font-medium tracking-wide">
                      {img.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && (
          <div className="py-24 rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-12 text-center text-sm text-zinc-500">
            <p className="text-lg font-medium text-zinc-700">No images yet</p>
            <p className="mt-2">
              Drop your café photos into{" "}
              <span className="font-mono bg-zinc-200 px-2 py-1 rounded">
                public/gallery
              </span>{" "}
              and refresh the page
            </p>
          </div>
        )}
        </Container>
    </div>
  );
}
