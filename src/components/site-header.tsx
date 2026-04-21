"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { href: "/", label: "Home", icon: "house" },
  { href: "/menu", label: "Menu", icon: "utensils" },
  { href: "/gallery", label: "Gallery", icon: "photo" },
  { href: "/reviews", label: "Reviews", icon: "star" },
  { href: "/contact", label: "Contact", icon: "envelope" },
];

const icons: Record<string, React.ReactNode> = {
  house: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  utensils: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  photo: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  star: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  envelope: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="flex h-16 items-center justify-between gap-4">
          {/* Logo - always visible */}
          <Link href="/" className="group inline-flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">
              Bartlett's
            </span>
            <span className="hidden sm:inline text-sm text-muted-foreground">Café</span>
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: View Menu CTA + Hamburger (mobile only) */}
          <div className="flex items-center gap-2">
            {/* View Menu CTA - hidden on mobile, shown on sm+ */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90"
            >
              View Menu
            </Link>

            {/* Hamburger Menu Button - mobile only */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="sm:hidden flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm sm:hidden"
            />

            {/* Menu Panel - Half screen height, slides from top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 z-50 h-[50vh] sm:hidden"
            >
              <div className="relative h-full bg-black/95 backdrop-blur-lg">
                {/* Close Button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                  aria-label="Close menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Menu Items */}
                <div className="flex h-full flex-col justify-center px-8">
                  <nav className="space-y-1">
                    {nav.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between py-4 text-2xl font-medium text-zinc-400 transition hover:text-amber-400 border-b border-zinc-800/50 last:border-0"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <span>{item.label}</span>
                        <span className="text-zinc-600 transition group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                          {icons[item.icon]}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
