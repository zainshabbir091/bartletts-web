import { Container } from "@/components/container";

export default function ContactPage() {
  return (
    <div className="surface">
      <Container className="py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact & Location
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          Located in Gulberg Arena Mall, Gulberg Greens (Block A), Islamabad.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Details</div>
            <dl className="mt-4 space-y-3 text-sm text-zinc-700">
              <div>
                <dt className="text-xs font-medium text-zinc-500">Address</dt>
                <dd className="mt-1">
                  J558+4P5, Gulberg Expy, Gulberg Greens Block A, Islamabad
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Hours</dt>
                <dd className="mt-1">Open 24 hours</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Phone</dt>
                <dd className="mt-1">0329 3399440</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Price</dt>
                <dd className="mt-1">Rs 1,000–2,000 per person</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Map</div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Next: I’ll embed a Google Map once you share the exact Maps place
              link (or you can keep this lightweight).
            </p>
            <div className="mt-6 rounded-xl border border-black/5 bg-zinc-50 p-6 text-sm text-zinc-700">
              Map embed placeholder
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

