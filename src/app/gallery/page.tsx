import { Container } from "@/components/container";
import Image from "next/image";
import { getGalleryImages } from "@/lib/gallery";

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <div className="surface">
      <Container className="py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Gallery
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Add your café photos into{" "}
          <span className="font-medium">public/gallery</span> (jpg/png/webp) and
          I’ll auto-render them here as a clean masonry grid.
        </p>

        {images.length ? (
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((img) => (
              <div
                key={img.src}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-black/5 bg-white p-6 text-sm text-zinc-700">
            No images loaded yet. Drop files into{" "}
            <span className="font-medium">public/gallery</span> and refresh.
          </div>
        )}
      </Container>
    </div>
  );
}

