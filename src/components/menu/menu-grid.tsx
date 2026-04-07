"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import type { MenuCategory } from "@/data/menu";
import { slugify } from "@/lib/slug";
import { useMemo, useState } from "react";

// Default to trying local `public/menu/...` assets first.
// Set NEXT_PUBLIC_MENU_IMAGES=remote if you want to force Unsplash placeholders.
const preferLocalMenuImages = process.env.NEXT_PUBLIC_MENU_IMAGES !== "remote";
const localMenuImageExts = ["webp", "jpg", "png"] as const;
const placeholderSrc = "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1200&q=75";

function shimmerDataUrl(w = 700, h = 450) {
  const svg = `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f4f4f5" offset="20%"/>
          <stop stop-color="#e4e4e7" offset="50%"/>
          <stop stop-color="#f4f4f5" offset="70%"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f4f4f5"/>
      <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.15s" repeatCount="indefinite" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${typeof window === "undefined" ? Buffer.from(svg).toString("base64") : btoa(svg)}`;
}

function unsplash(src: string) {
  return `https://images.unsplash.com/${src}?auto=format&fit=crop&w=1200&q=75`;
}

function categoryImage(slug: string) {
  switch (slug) {
    case "artisanal-coffee":
    case "classic-coffees":
    case "signature-lattes":
    case "flavoured-coffees":
    case "cold-coffees":
      return unsplash("photo-1442512595331-e89e73853f31");
    case "hot-beverages-teas":
      return unsplash("photo-1544787219-7f47ccb76574");
    case "fruit-chillers-smoothies":
      return unsplash("photo-1551024709-8f23befc6f87");
    case "snowdrifts":
      return unsplash("photo-1499636136210-6f4ee915583e");
    case "cheesecakes-loaves":
      return unsplash("photo-1464305795204-6f5bbfc7fb81");
    case "classic-cakes":
    case "sundaes-desserts-bakes":
      return unsplash("photo-1486427944299-d1955d23e34d");
    case "toasty-sandwiches":
    case "paninis-sandwiches":
    case "wraps-specialties":
      return unsplash("photo-1528735602780-2552fd46c7af");
    case "croissants-pastries":
    case "donuts-rolls":
      return unsplash("photo-1511379938547-c1f69419868d");
    case "salads":
      return unsplash("photo-1540189549336-e6e99c3679fe");
    case "add-ons-water":
      return unsplash("photo-1548839140-29a749e1cf4d");
    default:
      return unsplash("photo-1442512595331-e89e73853f31");
  }
}

function itemImage(categorySlug: string, index: number) {
  const sig = `${categorySlug}-${index}`;
  const seed = Array.from(sig).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const w = 900 + (seed % 250);
  const h = 700 + (seed % 250);
  return `${categoryImage(categorySlug)}&w=${w}&h=${h}`;
}

function localMenuImage(categorySlug: string, itemName: string) {
  // Convention: public/menu/<category-slug>/<item-slug>.<ext>
  // Default to webp; we’ll retry other extensions on error.
  return `/menu/${categorySlug}/${slugify(itemName)}.${localMenuImageExts[0]}`;
}

function localMenuImageCandidates(categorySlug: string, itemName: string) {
  const base = `/menu/${categorySlug}/${slugify(itemName)}.`;
  return localMenuImageExts.map((ext) => `${base}${ext}`);
}

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
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, idx) => (
        <Reveal
          key={`${category.slug}:${item.name}`}
          delay={Math.min(0.25, idx * 0.03)}
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-amber-200/70"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-amber-300/20 blur-2xl" />
              <div className="absolute -bottom-28 -right-28 h-56 w-56 rounded-full bg-blue-300/15 blur-2xl" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden">
              {!loaded[`${category.slug}:${item.name}`] ? (
                <div className="absolute inset-0 animate-pulse bg-zinc-100" />
              ) : null}
              <Image
                src={
                  srcOverrides[`${category.slug}:${item.name}`] ??
                  (preferLocalMenuImages
                    ? localMenuImage(category.slug, item.name)
                    : placeholderSrc)
                }
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.06]"
                placeholder="blur"
                blurDataURL={shimmerDataUrl(800, 500)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">
                    {item.name}
                  </div>
                  <div className="truncate text-xs text-white/75">
                    {category.name}
                  </div>
                </div>

                {typeof item.pricePkr === "number" ? (
                  <div className="shrink-0 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-950">
                    PKR {item.pricePkr.toLocaleString("en-PK")}
                  </div>
                ) : (
                  <div className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                    Ask for price
                  </div>
                )}
              </div>
            </div>

            <div className="relative p-5">
              {item.description ? (
                <p className="text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
              ) : (
                <p className="text-sm leading-6 text-zinc-600">
                  A Bartlett’s favorite—ask the team for today’s best pairing.
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  {item.featured ? (
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-800">
                      Featured
                    </span>
                  ) : null}
                  {item.popular ? (
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">
                      Popular
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
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
                  className="relative overflow-hidden text-xs font-semibold text-amber-800 transition hover:text-amber-900"
                >
                  <span className="relative z-10">View details →</span>
                  <span className="absolute inset-0 -translate-x-full bg-amber-200/40 transition-transform duration-300 group-hover:translate-x-0" />
                </button>
              </div>
            </div>
          </motion.div>
        </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeItem.name} details`}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-xl"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/8]">
                {!loaded[`${activeItem.categorySlug}:${activeItem.name}`] ? (
                  <div className="absolute inset-0 animate-pulse bg-zinc-100" />
                ) : null}
                <Image
                  src={
                    srcOverrides[`${activeItem.categorySlug}:${activeItem.name}`] ??
                    (preferLocalMenuImages
                      ? localMenuImage(activeItem.categorySlug, activeItem.name)
                      : placeholderSrc)
                  }
                  alt={activeItem.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={shimmerDataUrl(900, 450)}
                  onLoadingComplete={() => {
                    const k = `${activeItem.categorySlug}:${activeItem.name}`;
                    setLoaded((prev) => (prev[k] ? prev : { ...prev, [k]: true }));
                  }}
                  onError={(e) => {
                    const k = `${activeItem.categorySlug}:${activeItem.name}`;
                    const current = srcOverrides[k] ?? localMenuImage(activeItem.categorySlug, activeItem.name);
                    const candidates = localMenuImageCandidates(activeItem.categorySlug, activeItem.name);
                    const nextCandidate = candidates[candidates.indexOf(current) + 1];
                    const next = nextCandidate ?? placeholderSrc;
                    setSrcOverrides((prev) => (prev[k] === next ? prev : { ...prev, [k]: next }));
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <div className="truncate text-lg font-semibold text-white">
                      {activeItem.name}
                    </div>
                    <div className="truncate text-sm text-white/75">
                      {activeItem.categoryName}
                    </div>
                  </div>
                  {typeof activeItem.pricePkr === "number" ? (
                    <div className="shrink-0 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-zinc-950">
                      PKR {activeItem.pricePkr.toLocaleString("en-PK")}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="p-6">
                {activeItem.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {activeItem.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <p className="mt-4 text-sm leading-6 text-zinc-700">
                  {activeItem.details ?? activeItem.description ?? "Details coming soon."}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeItem.featured ? (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                        Featured
                      </span>
                    ) : null}
                    {activeItem.popular ? (
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

