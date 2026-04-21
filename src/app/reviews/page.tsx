"use client";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { useState } from "react";

const initialReviews = [
  {
    id: 1,
    name: "Zain Shabbir",
    body: "Delicious coffee and sandwiches with good portion sizes. Great environment and very friendly staff. Highly recommended.",
    rating: 5,
    date: "2 weeks ago",
    category: "Breakfast",
    avatar: "ZS",
  },
  {
    id: 2,
    name: "Vaniya Junaid Khan",
    body: "Wonderful experience. Food was immaculate with generous portions. Cozy ambiance and timely, hospitable service.",
    rating: 5,
    date: "2 months ago",
    category: "Rs 1–1,000",
    avatar: "VJ",
  },
  {
    id: 3,
    name: "Raheel Malik",
    body: "Serene and calming environment. Menu guidance was helpful, and the ambiance and cleanliness were spot on.",
    rating: 5,
    date: "4 months ago",
    category: "Rs 1,000–2,000",
    avatar: "RM",
  },
  {
    id: 4,
    name: "Ayesha Tariq",
    body: "The Berry White Mocha is absolutely divine! Perfect balance of sweetness and coffee. Will definitely be coming back.",
    rating: 5,
    date: "1 month ago",
    category: "Coffee",
    avatar: "AT",
  },
  {
    id: 5,
    name: "Hassan Ahmed",
    body: "Great place for remote work. Quiet corners, excellent wifi, and the staff doesn't rush you out. Cheesecake is a must-try!",
    rating: 4,
    date: "3 weeks ago",
    category: "Dessert",
    avatar: "HA",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, name }: { initials: string; name: string }) {
  const colors = [
    "bg-amber-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-violet-500",
    "bg-cyan-500",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full ${colors[colorIndex]} text-sm font-semibold text-white`}
    >
      {initials}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    rating: 5,
    category: "General",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        ...formData,
        date: "Just now",
        avatar: formData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      };

      setReviews([newReview, ...reviews]);
      setFormData({ name: "", body: "", rating: 5, category: "General" });
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(245,158,11,0.15),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_80%_60%,rgba(59,130,246,0.08),transparent_55%)]" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium tracking-wide text-amber-400">
                Customer Stories
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                What our guests say
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-7 text-zinc-400">
                Discover why coffee lovers choose Bartlett&apos;s Café. Real reviews
                from real guests who have experienced our premium coffee and cozy
                ambiance.
              </p>
            </Reveal>

            {/* Stats Cards */}
            <Reveal delay={0.2}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-white">
                      {averageRating.toFixed(1)}
                    </span>
                    <svg
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">Average Rating</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">
                    {reviews.length}+
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">Reviews</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <p className="mt-1 text-xs text-zinc-500">Recommended</p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">24h</div>
                  <p className="mt-1 text-xs text-zinc-500">Response Time</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Reviews Grid */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
            {/* Reviews List */}
            <div className="lg:col-span-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Recent Reviews
                </h2>
                <span className="text-sm text-zinc-500">
                  {reviews.length} reviews
                </span>
              </div>

              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <Reveal key={review.id} delay={0.05 * idx}>
                    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                      <div className="flex items-start gap-4">
                        <Avatar initials={review.avatar} name={review.name} />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-white">
                                {review.name}
                              </h3>
                              <div className="mt-0.5 flex items-center gap-2">
                                <StarRating rating={review.rating} />
                                <span className="text-xs text-zinc-500">
                                  • {review.date}
                                </span>
                              </div>
                            </div>
                            <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-2.5 py-1 text-xs font-medium text-zinc-400">
                              {review.category}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                            {review.body}
                          </p>

                          <div className="mt-4 flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-300">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M14 10h4.764a2 2 0 011.789 2.894l-1.432 2.874a2 2 0 01-1.946 1.106h-.87v2.104a2 2 0 01-1.268 1.866l-2.667 1.067a2 2 0 01-1.732 0l-2.667-1.067a2 2 0 01-1.268-1.866v-2.104h-.87a2 2 0 01-1.946-1.106l-1.432-2.874A2 2 0 014.236 10H9m8-4a2 2 0 012 2v6a2 2 0 01-2 2h-.09"
                                />
                              </svg>
                              Helpful
                            </button>
                            <button className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-300">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                              </svg>
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Add Review Card */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-6">
                <Reveal delay={0.1}>
                  <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950">
                    <div className="border-b border-zinc-800 bg-zinc-900/50 p-6">
                      <h3 className="text-lg font-semibold text-white">
                        Write a Review
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        Share your experience with others
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                      {showSuccess && (
                        <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                          <p className="text-sm text-emerald-400">
                            Thank you! Your review has been submitted.
                          </p>
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* Name Input */}
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-medium text-zinc-300"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            placeholder="Enter your name"
                          />
                        </div>

                        {/* Rating Selector */}
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                            Rating
                          </label>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() =>
                                  setFormData({ ...formData, rating: star })
                                }
                                className="p-1 transition hover:scale-110"
                              >
                                <svg
                                  className={`h-6 w-6 ${
                                    star <= formData.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-zinc-700 text-zinc-700"
                                  }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                            ))}
                            <span className="ml-2 text-sm text-zinc-500">
                              {formData.rating}/5
                            </span>
                          </div>
                        </div>

                        {/* Category Select */}
                        <div>
                          <label
                            htmlFor="category"
                            className="mb-1.5 block text-sm font-medium text-zinc-300"
                          >
                            Visit Type
                          </label>
                          <select
                            id="category"
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          >
                            <option>General</option>
                            <option>Breakfast</option>
                            <option>Coffee</option>
                            <option>Lunch</option>
                            <option>Dessert</option>
                            <option>Dinner</option>
                          </select>
                        </div>

                        {/* Review Text */}
                        <div>
                          <label
                            htmlFor="body"
                            className="mb-1.5 block text-sm font-medium text-zinc-300"
                          >
                            Your Review
                          </label>
                          <textarea
                            id="body"
                            required
                            rows={4}
                            value={formData.body}
                            onChange={(e) =>
                              setFormData({ ...formData, body: e.target.value })
                            }
                            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                            placeholder="Tell us about your experience..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="mr-2 h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            "Submit Review"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Reveal>

                {/* Trust Badge */}
                <Reveal delay={0.2}>
                  <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                        <svg
                          className="h-5 w-5 text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Verified Reviews
                        </p>
                        <p className="text-xs text-zinc-500">
                          All reviews are from genuine guests
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
