import { Reveal } from "@/components/reveal";
import { ScrollDown } from "@/components/scroll-down";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Static gradient background - warm coffee tones */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, #3D2314 0%, #5D3A1A 25%, #7B4B2A 50%, #5D3A1A 75%, #3D2314 100%),
                radial-gradient(ellipse at 30% 20%, rgba(255,176,103,0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(255,138,61,0.2) 0%, transparent 50%)
              `,
            }}
          />
          {/* Coffee shop interior color overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(245,158,11,0.22),transparent_55%),radial-gradient(900px_circle_at_80%_40%,rgba(59,130,246,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
                Gulberg Greens • Islamabad • Open 24 hours
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium coffee, calm ambiance, and food made fresh.
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg">
                Bartlett&apos;s Café is a cozy and elegant coffee spot located in
                Gulberg Greens. Perfect for coffee breaks, casual meetups, or
                quiet relaxation.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/menu"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 shadow-sm transition hover:bg-white/90"
                >
                  Explore the Menu
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Find us in Gulberg Arena Mall
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-xs font-medium text-white/70">Rating</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">4.8</dd>
                  <dd className="text-xs text-white/60">838 reviews</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-xs font-medium text-white/70">Price</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    Rs 1k–2k
                  </dd>
                  <dd className="text-xs text-white/60">per person</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-xs font-medium text-white/70">Phone</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    0329 3399440
                  </dd>
                  <dd className="text-xs text-white/60">call for info</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <dt className="text-xs font-medium text-white/70">
                    Location
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    Gulberg Greens
                  </dd>
                  <dd className="text-xs text-white/60">Block A</dd>
                </div>
              </dl>
            </Reveal>

            <div className="mt-10">
              <ScrollDown href="#highlights" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Crafted for coffee lovers
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  From artisanal brews to signature lattes, plus pastries, cakes,
                  sandwiches, and more—Bartlett&apos;s is built for your everyday
                  rituals.
                </p>
              </div>
              <a
                href="/menu"
                className="hidden rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900 sm:inline-flex"
              >
                See full menu
              </a>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Artisanal Coffee",
                desc: "V60, Chemex, French Press, AeroPress, and espresso classics.",
              },
              {
                title: "Signature Lattes",
                desc: "Turtle Mocha, Berry White Mocha, Campfire Mocha, and more.",
              },
              {
                title: "Desserts & Bakes",
                desc: "Cheesecakes, loaves, muffins, cookies, and seasonal treats.",
              },
            ].map((card, idx) => (
              <Reveal key={card.title} delay={0.06 * idx}>
                <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-sm font-semibold">{card.title}</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {card.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <a
              href="/menu"
              className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900"
            >
              See full menu
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
