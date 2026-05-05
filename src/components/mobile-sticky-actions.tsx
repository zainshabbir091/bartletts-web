"use client";

import { usePathname } from "next/navigation";

export function MobileStickyActions() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C4A45A]/30 bg-[#0B1218]/95 p-3 backdrop-blur-md md:hidden">
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
  );
}
