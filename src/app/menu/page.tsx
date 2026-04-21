"use client";
import { Container } from "@/components/container";
import { menu } from "@/data/menu";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { Star, Flame, ArrowLeft } from "lucide-react";

// ─── Category Images ───────────────────────────────────────────────────────────
const categoryImages: Record<string, string> = {
  "artisanal-coffee":         "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80",
  "signature-lattes":         "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80",
  "flavoured-coffees":        "https://images.unsplash.com/photo-1572442388796-116cfb7b2e14?w=600&q=80",
  "hot-beverages-teas":       "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
  "classic-coffees":          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
  "cold-coffees":             "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80",
  "fruit-chillers-smoothies": "https://images.unsplash.com/photo-1623593688280-a5a64d394fb5?w=600&q=80",
  "snowdrifts":               "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=600&q=80",
  "cheesecakes-loaves":       "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&q=80",
  "classic-cakes":            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  "sundaes-desserts-bakes":   "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
  "toasty-sandwiches":        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80",
  "paninis-sandwiches":       "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80",
  "wraps-specialties":        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80",
  "croissants-pastries":      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  "salads":                   "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  "donuts-rolls":             "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  "add-ons-water":            "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80",
};

// Fallback dish image per category slug keyword
const getItemEmoji = (slug = "") => {
  if (slug.includes("coffee") || slug.includes("latte")) return "☕";
  if (slug.includes("cake") || slug.includes("cheesecake")) return "🍰";
  if (slug.includes("sandwich") || slug.includes("panini")) return "🥪";
  if (slug.includes("salad")) return "🥗";
  if (slug.includes("donut")) return "🍩";
  if (slug.includes("croissant")) return "🥐";
  if (slug.includes("smoothie") || slug.includes("chiller")) return "🥤";
  if (slug.includes("tea") || slug.includes("beverage")) return "🍵";
  if (slug.includes("snowdrift")) return "🧊";
  if (slug.includes("wrap")) return "🌯";
  if (slug.includes("sundae") || slug.includes("dessert")) return "🍨";
  return "🍽️";
};

// Stable deterministic rating/reviews from item name
const stableRating  = (name: string) => (4 + ((name.charCodeAt(0) + name.length) % 10) / 10).toFixed(1);
const stableReviews = (name: string) => 50 + ((name.charCodeAt(1) || 0) * 7 + name.length * 3) % 200;

// ─── Component ─────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [view, setView]               = useState<"categories" | "items">("categories");
  const [activeCategory, setActiveCategory] = useState<(typeof menu)[0] | null>(null);

  // ── Hero / featured (first category, first item) ──────────────────────────
  const heroCategory = menu[0];
  const heroItem     = heroCategory?.items[0];
  const heroRating   = heroItem ? stableRating(heroItem.name)  : "4.5";
  const heroReviews  = heroItem ? stableReviews(heroItem.name) : 120;

  // ── Open category ─────────────────────────────────────────────────────────
  const openCategory = (cat: (typeof menu)[0]) => {
    setActiveCategory(cat);
    setView("items");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#0b0b0c", fontFamily: "'Georgia', serif" }}>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HERO SECTION (mobile only)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="sm:hidden" style={{ padding: "32px 16px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Left: text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ background: "#f59e0b", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 700, padding: "2px 10px", letterSpacing: 2 }}>PRICE</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b" }}>
                {heroItem?.pricePkr ? `PKR ${heroItem.pricePkr}` : "Ask"}
              </span>
              <span style={{ fontSize: 12, color: "#a1a1aa" }}>/ item</span>
            </div>

            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#fafafa", lineHeight: 1.2, margin: "0 0 12px", fontFamily: "'Georgia', cursive" }}>
              {heroItem?.name ?? "Signature Special"}
            </h1>

            {/* Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16}
                  fill={s <= Math.round(+heroRating) ? "#f59e0b" : "none"}
                  color={s <= Math.round(+heroRating) ? "#f59e0b" : "#52525b"}
                />
              ))}
              <span style={{ fontWeight: 700, color: "#fafafa" }}>{heroRating}</span>
              <span style={{ color: "#a1a1aa", fontSize: 12 }}>({heroReviews})</span>
            </div>

            <p style={{ color: "#a1a1aa", lineHeight: 1.6, marginBottom: 20, fontSize: 14 }}>
              {heroItem?.description ?? "Experience the finest blend of traditional recipes and premium ingredients, crafted to perfection in every bite."}
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ background: "#f59e0b", color: "#0b0b0c", border: "none", borderRadius: 40, padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 8px 24px rgba(245,158,11,0.35)" }}
              >
                View Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ background: "transparent", color: "#fafafa", border: "2px solid #27272a", borderRadius: 40, padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                Explore More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HERO SECTION (desktop only)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="hidden sm:block" style={{ padding: "48px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", minHeight: "420px" }}>
          {/* Left: text */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ background: "#f59e0b", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 700, padding: "2px 10px", letterSpacing: 2 }}>PRICE</span>
              <span style={{ fontSize: 26, fontWeight: 900, color: "#f59e0b" }}>
                {heroItem?.pricePkr ? `PKR ${heroItem.pricePkr}` : "Ask"}
              </span>
              <span style={{ fontSize: 13, color: "#a1a1aa" }}>/ item</span>
            </div>

            <h1 style={{ fontSize: "clamp(44px,6vw,80px)", fontWeight: 900, color: "#fafafa", lineHeight: 1.05, margin: "0 0 12px", fontFamily: "'Georgia', cursive" }}>
              {heroItem?.name ?? "Signature Special"}
            </h1>

            {/* Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={18}
                  fill={s <= Math.round(+heroRating) ? "#f59e0b" : "none"}
                  color={s <= Math.round(+heroRating) ? "#f59e0b" : "#52525b"}
                />
              ))}
              <span style={{ fontWeight: 700, color: "#fafafa" }}>{heroRating}</span>
              <span style={{ color: "#a1a1aa", fontSize: 13 }}>({heroReviews} reviews)</span>
            </div>

            <p style={{ color: "#a1a1aa", lineHeight: 1.7, maxWidth: 420, marginBottom: 28, fontSize: 15 }}>
              {heroItem?.description ?? "Experience the finest blend of traditional recipes and premium ingredients, crafted to perfection in every bite."}
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ background: "#f59e0b", color: "#0b0b0c", border: "none", borderRadius: 40, padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(245,158,11,0.35)" }}
              >
                View Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ background: "transparent", color: "#fafafa", border: "2px solid #27272a", borderRadius: 40, padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
              >
                Explore More
              </motion.button>
            </div>
          </motion.div>

          {/* Right: floating dish image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {/* blob bg */}
            <div style={{
              position: "absolute",
              width: 380, height: 380,
              background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
              borderRadius: "50%", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)"
            }}/>

            {/* Decorative spice dots */}
            {["top:10%,right:12%", "bottom:15%,left:10%", "top:55%,right:5%"].map((pos, i) => {
              const [t, r, b, l] = pos.split(",").map(p => p.split(":")[1]);
              return (
                <div key={i} style={{
                  position: "absolute",
                  width: [48,32,24][i], height: [48,32,24][i],
                  background: ["#f59e0b","#ea580c","#f59e0b"][i],
                  borderRadius: "50%", opacity: [0.2,0.15,0.1][i],
                  top: t, right: r, bottom: b, left: l
                }}/>
              );
            })}

            {/* Dish image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              style={{ position: "relative", zIndex: 2 }}
            >
              <div style={{ width: 340, height: 340, borderRadius: "50%", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.4)", border: "6px solid #27272a" }}>
                <img
                  src={categoryImages[heroCategory?.slug ?? ""] ?? "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"}
                  alt={heroItem?.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </motion.div>

            {/* Price badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              style={{
                position: "absolute", top: 24, right: 40,
                background: "#f59e0b", color: "#0b0b0c",
                width: 90, height: 90, borderRadius: "50%",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 24px rgba(245,158,11,0.4)", zIndex: 3, textAlign: "center"
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.85, letterSpacing: 1 }}>PRICE</span>
              <span style={{ fontSize: 16, fontWeight: 900 }}>
                {heroItem?.pricePkr ? `${heroItem.pricePkr}` : "—"}
              </span>
              <span style={{ fontSize: 10, opacity: 0.8 }}>PKR</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CATEGORIES / ITEMS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="categories-section" style={{ padding: "40px 16px 60px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Back button when viewing items */}
        <AnimatePresence>
          {view === "items" && activeCategory && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ marginBottom: 32 }}
            >
              <button
                onClick={() => setView("categories")}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#f59e0b", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
              >
                <ArrowLeft size={18}/> Back to Categories
              </button>
              <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#fafafa", margin: "12px 0 4px" }}>
                {activeCategory.name}
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: 14 }}>{activeCategory.note ?? "Fresh & handcrafted"}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section header for categories view */}
        {view === "categories" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ background: "#f59e0b", color: "#0b0b0c", borderRadius: 4, fontSize: 11, fontWeight: 700, padding: "3px 14px", letterSpacing: 2, display: "inline-block", marginBottom: 12 }}>
              OUR MENU
            </span>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, color: "#fafafa", margin: 0 }}>
              Choose a Category
            </h2>
          </motion.div>
        )}

        {/* ── CATEGORY CARDS (Biryani-style with image floating above) ── */}
        <AnimatePresence mode="wait">
          {view === "categories" && (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
              style={{ display: "grid", gap: "32px" }}
            >
              {menu.map((cat, i) => {
                const firstItem = cat.items[0];
                const img = categoryImages[cat.slug] ?? "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80";
                const accent = i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#ea580c" : "#f59e0b";
                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 100 }}
                    style={{ position: "relative", paddingTop: 64 }}
                  >
                    {/* Floating dish image */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        position: "absolute",
                        top: 0, left: "50%",
                        transform: "translateX(-50%)",
                        width: 130, height: 130,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "5px solid #27272a",
                        boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 0 2px ${accent}40`,
                        zIndex: 2
                      }}
                    >
                      <img src={img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                    </motion.div>

                    {/* Card body */}
                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}
                      style={{
                        background: "#18181b",
                        borderRadius: 24,
                        padding: "80px 24px 28px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "box-shadow 0.3s"
                      }}
                      onClick={() => openCategory(cat)}
                    >
                      {/* Price label */}
                      <div style={{ fontSize: 11, color: "#71717a", fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>PRICE FROM</div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: accent, marginBottom: 8 }}>
                        {firstItem?.pricePkr ? `PKR ${firstItem.pricePkr}` : "—"}
                      </div>

                      {/* Category name (italic/cursive like reference) */}
                      <div style={{ fontSize: 13, color: "#f59e0b", fontStyle: "italic", marginBottom: 2, fontFamily: "Georgia, serif" }}>
                        {cat.name.split(" ")[0]}
                      </div>
                      <h3 style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 900, color: "#fafafa", margin: "0 0 12px", lineHeight: 1.1 }}>
                        {cat.name}
                      </h3>

                      {/* Stars */}
                      <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 12 }}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={14} fill={s <= 4 ? "#f59e0b" : "none"} color={s <= 4 ? "#f59e0b" : "#3f3f46"}/>
                        ))}
                      </div>

                      {/* Mini description */}
                      <p style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 20, minHeight: 52 }}>
                        {cat.note ?? `${cat.items.length} items available. Crafted fresh daily with premium ingredients.`}
                      </p>

                      {/* CTA */}
                      <button
                        style={{
                          background: accent, color: "#0b0b0c", border: "none",
                          borderRadius: 40, padding: "10px 28px",
                          fontWeight: 700, fontSize: 13, cursor: "pointer",
                          transition: "opacity 0.2s"
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                      >
                        Browse Menu
                      </button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ── ITEM CARDS (same card style but denser) ── */}
          {view === "items" && activeCategory && (
            <motion.div
              key="items"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
              style={{ display: "grid", gap: "32px" }}
            >
              {activeCategory.items.map((item, i) => {
                const img = categoryImages[activeCategory.slug] ?? "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80";
                const accent = i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#ea580c" : "#f59e0b";
                const rating  = stableRating(item.name);
                const reviews = stableReviews(item.name);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                    style={{ position: "relative", paddingTop: 64 }}
                  >
                    {/* Floating dish image */}
                    <motion.div
                      whileHover={{ y: -8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        position: "absolute",
                        top: 0, left: "50%",
                        transform: "translateX(-50%)",
                        width: 120, height: 120,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "5px solid #27272a",
                        boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 0 2px ${accent}40`,
                        zIndex: 2
                      }}
                    >
                      <img src={img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}
                      style={{
                        background: "#18181b",
                        borderRadius: 24,
                        padding: "74px 20px 24px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        textAlign: "center",
                        transition: "box-shadow 0.3s"
                      }}
                    >
                      <div style={{ fontSize: 11, color: "#71717a", fontWeight: 600, letterSpacing: 1, marginBottom: 2 }}>PRICE</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: accent, marginBottom: 6 }}>
                        {item.pricePkr ? `PKR ${item.pricePkr}` : "Ask"}
                      </div>

                      <div style={{ fontSize: 12, color: "#f59e0b", fontStyle: "italic", marginBottom: 2, fontFamily: "Georgia, serif" }}>
                        {activeCategory.name}
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 900, color: "#fafafa", margin: "0 0 8px", lineHeight: 1.15 }}>
                        {item.name}
                      </h3>

                      {/* Stars */}
                      <div style={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 10 }}>
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={13} fill={s <= Math.round(+rating) ? "#f59e0b" : "none"} color={s <= Math.round(+rating) ? "#f59e0b" : "#3f3f46"}/>
                        ))}
                        <span style={{ fontSize: 12, color: "#71717a", marginLeft: 4 }}>{rating} ({reviews})</span>
                      </div>

                      <p style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 16, minHeight: 44 }}>
                        {item.description ?? "Crafted with care using the finest seasonal ingredients."}
                      </p>

                      {/* Popular badge */}
                      {(item as any).popular && (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#ea580c", color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
                          <Flame size={11}/> Popular
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}