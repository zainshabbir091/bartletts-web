"use client";

import { motion } from "framer-motion";
import type { MenuCategory } from "@/data/menu";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Professional category images from Unsplash
const categoryImages: Record<string, string> = {
  "artisanal-coffee": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
  "signature-lattes": "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
  "flavoured-coffees": "https://images.unsplash.com/photo-1572442388796-116cfb7b2e14?w=800&q=80",
  "hot-beverages-teas": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
  "classic-coffees": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  "cold-coffees": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80",
  "fruit-chillers-smoothies": "https://images.unsplash.com/photo-1623593688280-a5a64d394fb5?w=800&q=80",
  snowdrifts: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800&q=80",
  "cheesecakes-loaves": "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&q=80",
  "classic-cakes": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
  "sundaes-desserts-bakes": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
  "toasty-sandwiches": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "paninis-sandwiches": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "wraps-specialties": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
  "croissants-pastries": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
  salads: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  "donuts-rolls": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
  "add-ons-water": "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
};

const categoryDescriptions: Record<string, string> = {
  "artisanal-coffee": "Handcrafted brews with origin-forward flavors",
  "signature-lattes": "House specialties with unique flavor profiles",
  "flavoured-coffees": "Classic espresso with aromatic infusions",
  "hot-beverages-teas": "Premium teas and warming beverages",
  "classic-coffees": "Timeless espresso-based favorites",
  "cold-coffees": "Refreshing iced and cold brew options",
  "fruit-chillers-smoothies": "Fresh fruit blends and chilled beverages",
  snowdrifts: "Rich, creamy frozen dessert drinks",
  "cheesecakes-loaves": "Indulgent baked classics and slices",
  "classic-cakes": "Traditional layer cakes and desserts",
  "sundaes-desserts-bakes": "Sweet treats and bakery favorites",
  "toasty-sandwiches": "Grilled and toasted savory selections",
  "paninis-sandwiches": "Pressed Italian-style sandwiches",
  "wraps-specialties": "Rolled specialties and signature wraps",
  "croissants-pastries": "Buttery laminated pastries daily",
  salads: "Fresh greens and composed salads",
  "donuts-rolls": "Sweet fried dough and cinnamon rolls",
  "add-ons-water": "Premium waters and extras",
};

interface CategoryCardsProps {
  categories: MenuCategory[];
  onSelectCategory: (slug: string) => void;
  activeCategory: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export function CategoryCards({ categories, onSelectCategory, activeCategory, showViewAll, onViewAll }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category, index) => {
        const isActive = activeCategory === category.slug;
        const imageUrl = categoryImages[category.slug] || categoryImages["artisanal-coffee"];
        const description = categoryDescriptions[category.slug] || "Explore our selection";

        return (
          <motion.button
            key={category.slug}
            onClick={() => onSelectCategory(category.slug)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl text-left ${
              isActive ? "ring-2 ring-amber-500 ring-offset-2" : ""
            }`}
          >
            {/* Background Image */}
            <Image
              src={imageUrl}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              {/* Top - Item Count */}
              <div className="flex justify-end">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-md">
                  {category.items.length} ITEMS
                </span>
              </div>

              {/* Bottom - Category Info */}
              <div>
                <motion.div
                  initial={false}
                  className="transform transition-transform duration-300 group-hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-xs font-light leading-relaxed text-white/70 line-clamp-2">
                    {description}
                  </p>
                </motion.div>

                {/* Hover Reveal Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span>View Menu</span>
                  <ArrowUpRight className="h-3 w-3" />
                </motion.div>
              </div>
            </div>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Corner Accent */}
            <div className="absolute right-0 top-0 h-16 w-16 translate-x-8 translate-y-[-32px] rotate-45 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        );
      })}

      {/* View All Card */}
      {showViewAll && onViewAll && (
        <motion.button
          onClick={onViewAll}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: categories.length * 0.05,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-gradient-to-br from-zinc-50 to-zinc-100 text-left"
        >
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200/50 text-zinc-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.div>
            <h3 className="text-sm font-semibold tracking-tight text-zinc-800">
              Browse Complete Menu
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              View all {categories.reduce((acc, c) => acc + c.items.length, 0)} items
            </p>
          </div>

          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>
      )}
    </div>
  );
}
