"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { ScrollDown } from "@/components/scroll-down";

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
              ease: [0.22, 1, 0.36, 1],
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
        ease: [0.22, 1, 0.36, 1],
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
        ease: [0.22, 1, 0.36, 1],
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
        ease: [0.22, 1, 0.36, 1],
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
              className="h-full w-full object-cover"
            />
          </div>
          {/* Subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge - scales in */}
            <ScaleFade delay={0.1}>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Gulberg Greens • Islamabad • Open 24 hours
              </p>
            </ScaleFade>

            {/* Main heading - word by word reveal */}
            <div className="mt-8">
              <AnimatedHeading
                delay={0.2}
                className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Premium coffee, calm ambiance, and food made fresh.
              </AnimatedHeading>
            </div>

            {/* Subtitle - fade up with blur */}
            <FadeUpBlur delay={0.8} className="mt-6">
              <p className="max-w-2xl text-pretty text-base leading-7 text-white/80 sm:text-lg">
                Bartlett&apos;s Café is a cozy and elegant coffee spot located in
                Gulberg Greens. Perfect for coffee breaks, casual meetups, or
                quiet relaxation.
              </p>
            </FadeUpBlur>

            {/* CTA Buttons - staggered fade up */}
            <FadeUpBlur delay={1} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.a
                  href="/menu"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 shadow-lg transition hover:bg-white/90 hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore the Menu
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
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
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">Rating</dt>
                  <dd className="mt-1 text-xl font-semibold text-white">4.8</dd>
                  <dd className="text-xs text-white/60">838 reviews</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">Price</dt>
                  <dd className="mt-1 text-xl font-semibold text-white">
                    Rs 1k–2k
                  </dd>
                  <dd className="text-xs text-white/60">per person</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">Phone</dt>
                  <dd className="mt-1 text-xl font-semibold text-white">
                    0329 3399440
                  </dd>
                  <dd className="text-xs text-white/60">call for info</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15">
                  <dt className="text-xs font-medium text-white/70">
                    Location
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-white">
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
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Reveal>
                <p className="text-sm font-medium text-amber-700">Our Specialties</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  Crafted for coffee lovers
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-base leading-7 text-zinc-600">
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
          <div className="space-y-20 lg:space-y-32">
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
        ease: [0.22, 1, 0.36, 1],
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
      {/* Image */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl ${
          imagePosition === "right" ? "lg:order-2" : "lg:order-1"
        }`}
        initial={{ opacity: 0, x: imageInitialX }}
        animate={
          isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imageInitialX }
        }
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
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
              ease: [0.22, 1, 0.36, 1],
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

      {/* Content */}
      <div className={imagePosition === "right" ? "lg:order-1" : "lg:order-2"}>
        <motion.div variants={itemVariants}>
          <p className="text-sm font-medium text-amber-700">{subtitle}</p>
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-base leading-7 text-zinc-600"
        >
          {description}
        </motion.p>

        {/* Features list */}
        <motion.ul
          variants={itemVariants}
          className="mt-6 grid grid-cols-2 gap-3"
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
