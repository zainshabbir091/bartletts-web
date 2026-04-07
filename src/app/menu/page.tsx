"use client";

import { Container } from "@/components/container";
import { menu } from "@/data/menu";
import { Reveal } from "@/components/reveal";
import { MenuGrid } from "@/components/menu/menu-grid";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [switching, setSwitching] = useState(false);

  const categories = useMemo(() => {
    if (activeCategory === "all") return menu;
    return menu.filter((c) => c.slug === activeCategory);
  }, [activeCategory]);

  function selectCategory(slug: string) {
    setSwitching(true);
    setActiveCategory(slug);
    window.setTimeout(() => setSwitching(false), 350);
    if (slug !== "all") {
      const el = document.getElementById(slug);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="surface">
      {/* Menu hero */}
      <section className="relative overflow-hidden rounded-b-[2rem] border-b border-black/5 bg-zinc-950 text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=2400&q=70"
            alt=""
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
        </div>
        <Container className="relative py-14 sm:py-16">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
              Crafted daily • Premium coffee • Fresh bakes
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Bartlett’s Menu
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Prices in PKR. Items may change based on availability.
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="relative">
        {/* Warm layered background + subtle blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(245,158,11,0.20),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(120,113,108,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed] via-white to-white" />
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute right-10 top-52 h-72 w-72 rounded-full bg-stone-200/50 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <Container className="py-10">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-6.5rem)] flex-col gap-4">
              <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur">
                <div className="text-xs font-semibold text-zinc-500">
                  Filters
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setOnlyFeatured((v) => !v)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      onlyFeatured
                        ? "bg-amber-200 text-amber-950"
                        : "bg-black/5 text-zinc-700 hover:bg-black/10"
                    }`}
                  >
                    Featured
                  </button>
                  <button
                    type="button"
                    onClick={() => setOnlyPopular((v) => !v)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      onlyPopular
                        ? "bg-zinc-200 text-zinc-900"
                        : "bg-black/5 text-zinc-700 hover:bg-black/10"
                    }`}
                  >
                    Popular
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur">
                <div className="px-2 pb-2 text-xs font-semibold text-zinc-500">
                  Categories
                </div>
                <nav className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-gutter:stable] overscroll-contain">
                  <button
                    type="button"
                    onClick={() => selectCategory("all")}
                    className={`w-full rounded-xl px-2 py-2 text-left text-sm font-medium transition hover:bg-black/5 hover:text-zinc-950 ${
                      activeCategory === "all"
                        ? "bg-black/5 text-zinc-950"
                        : "text-zinc-700"
                    }`}
                  >
                    All items
                  </button>
                  {menu.map((c) => (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => selectCategory(c.slug)}
                      className={`w-full rounded-xl px-2 py-2 text-left text-sm font-medium transition hover:bg-black/5 hover:text-zinc-950 ${
                        activeCategory === c.slug
                          ? "bg-black/5 text-zinc-950"
                          : "text-zinc-700"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-zinc-900">
                  Browse menu
                </div>
                <div className="relative w-full sm:max-w-md">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search coffee, croissant, cheesecake…"
                    className="h-11 w-full rounded-full border border-black/10 bg-white px-4 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-black/10"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}:${onlyFeatured}:${onlyPopular}:${switching ? "s" : "r"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-10"
              >
                {categories.map((category) => (
              <section
                key={category.slug}
                id={category.slug}
                className="scroll-mt-24"
              >
                <Reveal>
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {category.name}
                      </h2>
                      {category.note ? (
                        <p className="mt-2 text-sm text-zinc-600">
                          {category.note}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>

                {/* Skeleton shimmer while switching */}
                {switching ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
                      >
                        <div className="h-40 w-full animate-pulse bg-zinc-100" />
                        <div className="space-y-2 p-5">
                          <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-100" />
                          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-100" />
                          <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <MenuGrid
                    category={category}
                    query={query}
                    onlyFeatured={onlyFeatured}
                    onlyPopular={onlyPopular}
                  />
                )}
              </section>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </Container>
      </div>
    </div>
  );
}

