"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { ScrollDown } from "@/components/scroll-down";
import { Montserrat, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Professional text reveal with word-by-word animation
function AnimatedHeading({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const words = children.split(" ");

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", rotateX: -80 }}
            animate={
              isInView
                ? { y: 0, rotateX: 0 }
                : { y: "100%", rotateX: -80 }
            }
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            style={{ transformOrigin: "center bottom" }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// Fade up with blur animation
function FadeUpBlur({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 40, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale fade in for badges/buttons
function ScaleFade({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.9, y: 10 }
      }
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered card reveal
function StaggerCards({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.dl
      ref={ref}
      className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {Array.isArray(children) &&
        children.map((child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
    </motion.dl>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <MobileHome />

      <div className="hidden md:block">
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Hero video background */}
            {/* eslint-disable-next-line @next/next/no-video-element */}
            <video
              src="/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full bg-black object-contain sm:object-cover"
            />
          </div>
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge - scales in */}
            <ScaleFade delay={0.1}>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Gulberg Greens • Islamabad • Open 24 hours
              </p>
            </ScaleFade>

            {/* Main heading - word by word reveal */}
            <div className="mt-6">
              <AnimatedHeading
                delay={0.2}
                className="text-balance text-3xl sm:text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Premium coffee, calm ambiance, and food made fresh.
              </AnimatedHeading>
            </div>

            {/* Subtitle - fade up with blur */}
            <FadeUpBlur delay={0.8} className="mt-4">
              <p className="max-w-2xl text-pretty text-sm sm:text-base leading-7 text-white/80 sm:text-lg">
                Bartlett&apos;s Café is a cozy and elegant coffee spot located in
                Gulberg Greens. Perfect for coffee breaks, casual meetups, or
                quiet relaxation.
              </p>
            </FadeUpBlur>

            {/* CTA Buttons - staggered fade up */}
            <FadeUpBlur delay={1} className="mt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.a
                  href="/menu"
                  className="group inline-flex h-10 sm:h-12 items-center justify-center gap-2 rounded-full bg-white px-5 sm:px-6 text-xs sm:text-sm font-semibold text-zinc-950 shadow-lg transition hover:bg-white/90 hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore the Menu
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
                <motion.a
                  href="/contact"
                  className="inline-flex h-10 sm:h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 sm:px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Find us in Gulberg Arena Mall
                </motion.a>
              </div>
            </FadeUpBlur>

            {/* Info cards - staggered reveal */}
            <StaggerCards delay={1.2}>
              <>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">Rating</dt>
                  <dd className="mt-1 text-lg sm:text-xl font-semibold text-white">4.8</dd>
                  <dd className="text-xs text-white/60">838 reviews</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">Price</dt>
                  <dd className="mt-1 text-lg sm:text-xl font-semibold text-white">
                    Rs 1k–2k
                  </dd>
                  <dd className="text-xs text-white/60">per person</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">Phone</dt>
                  <dd className="mt-1 text-lg sm:text-xl font-semibold text-white">
                    0329 3399440
                  </dd>
                  <dd className="text-xs text-white/60">call for info</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">
                    Location
                  </dt>
                  <dd className="mt-1 text-lg sm:text-xl font-semibold text-white">
                    Gulberg Greens
                  </dd>
                  <dd className="text-xs text-white/60">Block A</dd>
                </div>
              </>
            </StaggerCards>

            <div className="mt-12">
              <ScrollDown href="#highlights" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10 sm:mb-16 flex flex-col sm:items-end justify-between gap-4 sm:gap-6">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-sm font-medium text-amber-700">Our Specialties</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-2 text-balance text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  Crafted for coffee lovers
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-600">
                  From artisanal brews to signature lattes, plus pastries, cakes,
                  sandwiches, and more—Bartlett&apos;s is built for your everyday
                  rituals.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <motion.a
                href="/menu"
                className="hidden rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:inline-flex"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See full menu
              </motion.a>
            </Reveal>
          </div>

          {/* Feature Rows */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* Artisanal Coffee - Image on Left, slides from RIGHT to LEFT */}
            <FeatureRow
              image="/coffe-ezgif.com-webp-to-jpg-converter.jpg"
              imageAlt="Pour-over coffee brewing with Chemex"
              title="Artisanal Coffee"
              subtitle="Brewed to Perfection"
              description="Experience the art of coffee brewing with our handcrafted V60, Chemex, and French Press methods. Each cup is meticulously prepared by our skilled baristas using premium single-origin beans."
              features={["V60 Pour-Over", "Chemex Brewing", "French Press", "AeroPress"]}
              ctaText="Explore Coffee Menu"
              ctaHref="/menu"
              imagePosition="left"
              slideDirection="right-to-left"
              delay={0}
            />

            {/* Signature Lattes - Image on Right, slides from LEFT to RIGHT */}
            <FeatureRow
              image="/latte-ezgif.com-webp-to-jpg-converter.jpg"
              imageAlt="Latte art in ceramic cup"
              title="Signature Lattes"
              subtitle="Creative Flavors"
              description="Indulge in our house specialties—Turtle Mocha, Berry White Mocha, and Campfire Mocha. Each latte is crafted with love, featuring silky steamed milk and artistic latte art."
              features={["Turtle Mocha", "Berry White Mocha", "Campfire Mocha", "Classic Cappuccino"]}
              ctaText="View Latte Menu"
              ctaHref="/menu"
              imagePosition="right"
              slideDirection="left-to-right"
              delay={0.2}
            />

            {/* Desserts - Image on Left, slides from RIGHT to LEFT */}
            <FeatureRow
              image="/panini-ezgif.com-webp-to-jpg-converter.jpg"
              imageAlt="Chocolate cake with berries"
              title="Desserts & Bakes"
              subtitle="Sweet Indulgences"
              description="Pair your coffee with our selection of freshly baked cheesecakes, loaves, muffins, and cookies. Made daily in-house with the finest ingredients."
              features={["NY Cheesecake", "Banana Bread", "Blueberry Muffins", "Chocolate Cookies"]}
              ctaText="See Sweet Treats"
              ctaHref="/menu"
              imagePosition="left"
              slideDirection="right-to-left"
              delay={0.4}
            />
          </div>

          <Reveal delay={0.5}>
            <div className="mt-16 sm:hidden">
              <a
                href="/menu"
                className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900"
              >
                See full menu
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </div>
  );
}

function MobileHome() {
  const quickStats = [
    { label: "Rating", value: "3.8 / 5", meta: "838 reviews" },
    { label: "Open", value: "24/7", meta: "Every day" },
    { label: "Price", value: "Rs 1k-2k", meta: "Per person" },
  ];

  const mobileShowcaseCards = [
    {
      image: "/coffe-ezgif.com-webp-to-jpg-converter.jpg",
      imageAlt: "Coffee cup and fresh pastry",
      eyebrow: "Brewed to Perfection",
      title: "Artisanal Coffee",
      description: "V60 Pour-Over, Chemex, French Press, and AeroPress.",
    },
    {
      image: "/latte-ezgif.com-webp-to-jpg-converter.jpg",
      imageAlt: "Signature latte art",
      eyebrow: "Creative Flavors",
      title: "Signature Lattes",
      description: "Turtle Mocha, Berry White Mocha, Campfire Mocha, and more.",
    },
    {
      image: "/panini-ezgif.com-webp-to-jpg-converter.jpg",
      imageAlt: "Dessert and bakery selection",
      eyebrow: "Freshly Baked",
      title: "Desserts and Bakes",
      description: "Cheesecake, muffins, cookies, and daily baked specials.",
    },
  ];

  const ctaItems = [
    {
      label: "Dine-in",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6v6M7 6v6M4 9h3M11 6v12M16 8h5M18.5 8v10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Takeout",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 9h14l-1 9H6L5 9ZM9 9V7a3 3 0 0 1 6 0v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Delivery",
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7h11v8H3V7Zm11 2h3l3 3v3h-6V9Zm-7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`md:hidden ${montserrat.className} bg-[#0B1218] pb-24 text-white`}
    >
      <section className="relative min-h-[100svh] overflow-hidden bg-[#0B1218]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-video-element */}
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#091017]/70 via-[#0b1218]/65 to-[#0B1218]/95" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-5 pb-8 pt-24">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-[4px] border border-[#C4A45A]/60 bg-[#151F28]/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#C4A45A]"
          >
            ★ 3.8 / 5
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${playfair.className} mt-4 text-[38px] font-semibold leading-[1.05] tracking-tight text-white`}
          >
            Premium coffee, calm ambiance, and food made fresh.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm leading-7 tracking-tight text-[#A0A0A0]"
          >
            Bartlett&apos;s Cafe is cozy, elegant, and perfect for coffee breaks,
            meetups, and relaxed evenings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 space-y-3"
          >
            <a
              href="/menu"
              className="inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-[#C4A45A] px-5 text-sm font-semibold text-[#0B1218] shadow-lg"
            >
              Explore the Menu
            </a>
            <a
              href="/contact"
              className="inline-flex h-11 w-full items-center justify-center rounded-[4px] border border-white/30 bg-transparent px-5 text-sm font-semibold text-white"
            >
              Find us in Gulberg Arena Mall
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 grid grid-cols-3 gap-2"
          >
            {ctaItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 rounded-[4px] border border-[#C4A45A]/30 bg-[#151F28]/80 px-2 py-3 text-[#C4A45A]"
              >
                {item.icon}
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4BE83]">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex justify-center"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <a
              href="#mobile-highlights"
              className="inline-flex items-center gap-2 rounded-[4px] border border-[#C4A45A]/40 bg-[#0f1720]/60 px-3 py-1.5 text-xs font-medium text-[#C4A45A]"
            >
              Scroll
              <span aria-hidden>↓</span>
            </a>
          </motion.div>
        </div>
      </section>

      <section id="mobile-highlights" className="mx-auto max-w-md space-y-8 px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#C4A45A]">
            Our Specialties
          </p>
          <h2
            className={`${playfair.className} mt-2 text-3xl font-semibold leading-tight text-white`}
          >
            Crafted for coffee lovers
          </h2>
          <p className="mt-3 text-sm leading-7 tracking-tight text-[#A0A0A0]">
            From artisanal brews to signature lattes, plus pastries, cakes,
            sandwiches, and more.
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-2"
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[4px] border border-[#C4A45A]/30 bg-[#151F28] p-3 text-center"
            >
              <dt className="text-[10px] uppercase tracking-[0.2em] text-[#A0A0A0]">
                {stat.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-white">{stat.value}</dd>
              <dd className="text-[10px] text-[#A0A0A0]">{stat.meta}</dd>
            </div>
          ))}
        </motion.dl>

        <div className="space-y-7">
          {mobileShowcaseCards.map((feature, index) => (
            <MobileFeatureCard
              key={feature.title}
              image={feature.image}
              imageAlt={feature.imageAlt}
              eyebrow={feature.eyebrow}
              title={feature.title}
              description={feature.description}
              delay={index * 0.05}
            />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C4A45A]/30 bg-[#0B1218]/95 p-3 backdrop-blur-md">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <a
            href="tel:+923293399440"
            className="inline-flex h-11 items-center justify-center rounded-[4px] border border-white/30 text-sm font-semibold text-white"
          >
            Call
          </a>
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[#C4A45A] text-sm font-semibold text-[#0B1218]"
          >
            Reserve
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileFeatureCard({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  delay,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className="overflow-hidden rounded-[4px] border border-[#C4A45A]/20 bg-[#151F28]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: delay + 0.05 }}
        className="relative aspect-[16/10] overflow-hidden"
      >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1218]/90 via-[#0B1218]/40 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#D8C187]">{eyebrow}</p>
          <h3 className={`${playfair.className} mt-1 text-3xl leading-none text-white`}>
            {title}
          </h3>
          <p className="mt-2 text-xs leading-6 tracking-tight text-[#CFCFCF]">{description}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

// Feature Row Component with Image + Details
function FeatureRow({
  image,
  imageAlt,
  title,
  subtitle,
  description,
  features,
  ctaText,
  ctaHref,
  imagePosition,
  slideDirection,
  delay = 0,
}: {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  imagePosition: "left" | "right";
  slideDirection: "left-to-right" | "right-to-left";
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Determine animation based on slide direction
  // right-to-left: image starts at x: 100 (right) and moves to x: 0
  // left-to-right: image starts at x: -100 (left) and moves to x: 0
  const imageInitialX = slideDirection === "right-to-left" ? 100 : -100;

  return (
    <motion.div
      ref={ref}
      className={`grid items-center gap-8 lg:gap-16 ${
        imagePosition === "right"
          ? "lg:grid-cols-[1fr_1.2fr]"
          : "lg:grid-cols-[1.2fr_1fr]"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {/* Image - hidden on mobile, shown on lg+ */}
      <motion.div
        className={`hidden lg:block relative overflow-hidden rounded-2xl ${
          imagePosition === "right" ? "lg:order-2" : "lg:order-1"
        }`}
        initial={{ opacity: 0, x: imageInitialX }}
        animate={
          isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageInitialX }
        }
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
          {/* Image mask animation */}
          <motion.div
            className="absolute inset-0 z-10 bg-stone-50"
            initial={{
              scaleX: 1,
              originX: slideDirection === "right-to-left" ? 1 : 0,
            }}
            animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + 0.2,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
        </div>
      </motion.div>

      {/* Mobile Image - shown only on mobile/tablet, hidden on lg+ */}
      <motion.div
        className="lg:hidden relative overflow-hidden rounded-2xl"
        initial={{ opacity: 0, x: imageInitialX * 0.6, y: 20 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: imageInitialX * 0.6, y: 20 }
        }
        transition={{ duration: 0.6, delay: delay }}
      >
        <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className={imagePosition === "right" ? "lg:order-1" : "lg:order-2"}>
        <motion.div variants={itemVariants}>
          <p className="text-sm font-medium text-amber-700">{subtitle}</p>
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="mt-3 text-sm sm:text-base leading-7 text-zinc-600"
        >
          {description}
        </motion.p>

        {/* Features list - single column on mobile */}
        <motion.ul
          variants={itemVariants}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
        >
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={itemVariants} className="mt-8">
          <motion.a
            href={ctaHref}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition"
            whileHover={{ x: 4 }}
          >
            {ctaText}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
