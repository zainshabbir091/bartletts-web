import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      {/* Main Footer Content */}
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                Bartlett&apos;s Café
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
              Cozy and elegant coffee spot in Gulberg Greens, Islamabad—premium
              coffee, freshly prepared food, and a calm ambiance.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  name: "Instagram",
                  icon: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4-.37 6.78-2.61 6.98-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  icon: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  icon: (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Visit Info */}
            <div>
              <h3 className="text-sm font-semibold text-white">Visit</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div className="text-sm text-zinc-400">
                      <p>Gulberg Arena Mall</p>
                      <p className="text-xs text-zinc-500">
                        J558+4P5, Gulberg Expy
                      </p>
                      <p className="text-xs text-zinc-500">
                        Gulberg Greens Block A
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-4 w-4 shrink-0 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Open 24 hours
                    </span>
                  </div>
                </li>
                <li>
                  <a
                    href="tel:03293399440"
                    className="flex items-center gap-3 text-sm text-zinc-400 transition hover:text-amber-400"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    0329 3399440
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore Links */}
            <div>
              <h3 className="text-sm font-semibold text-white">Explore</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { name: "Menu", href: "/menu" },
                  { name: "Gallery", href: "/gallery" },
                  { name: "Reviews", href: "/reviews" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                    >
                      <span className="h-1 w-1 rounded-full bg-zinc-600 transition group-hover:bg-amber-500"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-white">At a Glance</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-lg font-bold text-white">4.8</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">838 reviews</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                  <div className="text-lg font-bold text-white">Rs 1k–2k</div>
                  <p className="mt-1 text-xs text-zinc-500">per person</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Bartlett&apos;s Café. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-zinc-500 transition hover:text-zinc-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-zinc-500 transition hover:text-zinc-300"
            >
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
