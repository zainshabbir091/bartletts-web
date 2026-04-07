"use client";

import { motion } from "framer-motion";

export function ScrollDown({ href = "#highlights" }: { href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 backdrop-blur transition hover:bg-white/10"
    >
      <span>Scroll</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.span>
      <span className="sr-only">Scroll down</span>
    </a>
  );
}

