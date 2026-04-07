import { Container } from "@/components/container";

const reviews = [
  {
    name: "Zain Shabbir",
    body: "Delicious coffee and sandwiches with good portion sizes. Great environment and very friendly staff. Highly recommended.",
    meta: "Breakfast • Recent",
  },
  {
    name: "Vaniya Junaid Khan",
    body: "Wonderful experience. Food was immaculate with generous portions. Cozy ambiance and timely, hospitable service.",
    meta: "Rs 1–1,000 • 2 months ago",
  },
  {
    name: "Raheel Malik",
    body: "Serene and calming environment. Menu guidance was helpful, and the ambiance and cleanliness were spot on.",
    meta: "Rs 1,000–2,000 • 4 months ago",
  },
];

export default function ReviewsPage() {
  return (
    <div className="surface">
      <Container className="py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Reviews
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          A few highlights from guests who visited Bartlett’s Café in Gulberg
          Greens, Islamabad.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">{r.meta}</div>
                </div>
                <div className="text-xs font-semibold text-amber-700">
                  5.0
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-700">{r.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

