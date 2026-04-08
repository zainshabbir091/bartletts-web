"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MenuCategory } from "@/data/menu";
import { slugify } from "@/lib/slug";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

const localMenuImageExts = ["webp", "jpg", "png"] as const;
const placeholderSrc = "/placeholder.svg";

function localMenuImage(categorySlug: string, itemName: string) {
  return `/menu/${categorySlug}/${slugify(itemName)}.${localMenuImageExts[0]}`;
}

function localMenuImageCandidates(categorySlug: string, itemName: string) {
  const base = `/menu/${categorySlug}/${slugify(itemName)}.`;
  return localMenuImageExts.map((ext) => `${base}${ext}`);
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export function MenuGrid({
  category,
  query,
  onlyFeatured,
  onlyPopular,
}: {
  category: MenuCategory;
  query: string;
  onlyFeatured: boolean;
  onlyPopular: boolean;
}) {
  const [srcOverrides, setSrcOverrides] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<{
    categoryName: string;
    categorySlug: string;
    name: string;
    description?: string;
    details?: string;
    tags?: string[];
    pricePkr?: number;
    featured?: boolean;
    popular?: boolean;
  } | null>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return category.items.filter((it) => {
      if (onlyFeatured && !it.featured) return false;
      if (onlyPopular && !it.popular) return false;
      if (!q) return true;
      const hay = [
        it.name,
        it.description ?? "",
        it.details ?? "",
        (it.tags ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category.items, onlyFeatured, onlyPopular, query]);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {items.map((item) => (
          <motion.div
            key={`${category.slug}:${item.name}`}
            variants={itemVariants}
            layout
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                {!loaded[`${category.slug}:${item.name}`] && (
                  <div className="absolute inset-0 animate-pulse bg-zinc-200" />
                )}
                <Image
                  src={
                    srcOverrides[`${category.slug}:${item.name}`] ??
                    localMenuImage(category.slug, item.name)
                  }
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  onLoadingComplete={() => {
                    const k = `${category.slug}:${item.name}`;
                    setLoaded((prev) => (prev[k] ? prev : { ...prev, [k]: true }));
                  }}
                  onError={(e) => {
                    const k = `${category.slug}:${item.name}`;
                    const current = srcOverrides[k] ?? localMenuImage(category.slug, item.name);
                    const candidates = localMenuImageCandidates(category.slug, item.name);
                    const nextCandidate = candidates[candidates.indexOf(current) + 1];
                    const next = nextCandidate ?? placeholderSrc;
                    setSrcOverrides((prev) => (prev[k] === next ? prev : { ...prev, [k]: next }));
                  }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Tags */}
                <div className="absolute left-3 top-3 flex gap-2">
                  {item.featured && (
                    <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      FEATURED
                    </span>
                  )}
                  {item.popular && (
                    <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3">
                  {typeof item.pricePkr === "number" ? (
                    <span className="rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
                      PKR {item.pricePkr.toLocaleString("en-PK")}
                    </span>
                  ) : (
                    <span className="rounded-lg bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Ask for price
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-medium text-zinc-900">{item.name}</h4>
                {item.description && (
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* Tags Row */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Details Link */}
                <button
                  onClick={() =>
                    setActiveItem({
                      categoryName: category.name,
                      categorySlug: category.slug,
                      name: item.name,
                      description: item.description,
                      details: item.details,
                      tags: item.tags,
                      pricePkr: item.pricePkr,
                      featured: item.featured,
                      popular: item.popular,
                    })
                  }
                  className="mt-4 text-xs font-medium text-amber-700 transition hover:text-amber-900"
                >
                  View details →
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="mb-4 rounded-full bg-zinc-100 p-4">
            <svg
              className="h-6 w-6 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-base font-medium text-zinc-900">No items found</h3>
          <p className="mt-1 text-sm text-zinc-500">Try adjusting your filters</p>
        </motion.div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative aspect-[16/9]">
                <Image
                  src={
                    srcOverrides[`${activeItem.categorySlug}:${activeItem.name}`] ??
                    localMenuImage(activeItem.categorySlug, activeItem.name)
                  }
                  alt={activeItem.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 512px) 100vw, 512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/40"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-white/70">{activeItem.categoryName}</p>
                      <h3 className="text-xl font-semibold text-white">{activeItem.name}</h3>
                    </div>
                    {typeof activeItem.pricePkr === "number" && (
                      <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-zinc-900">
                        PKR {activeItem.pricePkr.toLocaleString("en-PK")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5">
                {activeItem.tags && activeItem.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {activeItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm leading-relaxed text-zinc-600">
                  {activeItem.details || activeItem.description || "Details coming soon."}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-2">
                    {activeItem.featured && (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Featured
                      </span>
                    )}
                    {activeItem.popular && (
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        Popular
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
