import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-zinc-50">
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-base font-semibold tracking-tight">
              Bartlett’s Café
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Cozy and elegant coffee spot in Gulberg Greens, Islamabad—premium
              coffee, freshly prepared food, and a calm ambiance.
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Visit</div>
            <div className="text-sm text-muted-foreground">
              <div>Located in: Gulberg Arena Mall</div>
              <div>Address: J558+4P5, Gulberg Expy, Gulberg Greens Block A</div>
              <div>Hours: Open 24 hours</div>
              <div>Phone: 0329 3399440</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Explore</div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/menu"
                className="rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground hover:bg-black/10"
              >
                Menu
              </Link>
              <Link
                href="/gallery"
                className="rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground hover:bg-black/10"
              >
                Gallery
              </Link>
              <Link
                href="/reviews"
                className="rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground hover:bg-black/10"
              >
                Reviews
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground hover:bg-black/10"
              >
                Contact
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Price per person: Rs 1,000–2,000 • Rating: 4.8 (838 reviews)
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bartlett’s Café. All rights reserved.</p>
          <p>Built with Next.js.</p>
        </div>
      </Container>
    </footer>
  );
}

