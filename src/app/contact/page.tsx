"use client";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 4000);
    }, 800);
  };

  const contactCards = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      lines: ["Gulberg Arena Mall", "Gulberg Greens Block A", "Islamabad"],
      action: { text: "Get Directions", href: "https://maps.google.com/?q=Gulberg+Arena+Mall+Islamabad" },
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      lines: ["0329 3399440"],
      action: { text: "Call Now", href: "tel:03293399440" },
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Hours",
      lines: ["Open 24 hours", "Every day of the week"],
      action: null,
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      lines: ["hello@bartlettscafe.com"],
      action: { text: "Send Email", href: "mailto:hello@bartlettscafe.com" },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(245,158,11,0.15),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_80%_60%,rgba(59,130,246,0.08),transparent_55%)]" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium tracking-wide text-amber-400">
                Get in Touch
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Contact & Location
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                Visit us at Gulberg Arena Mall in Gulberg Greens, Islamabad. Open 24 hours for your coffee cravings.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, idx) => (
              <Reveal key={card.title} delay={0.05 * idx}>
                <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{card.title}</h3>
                  <div className="mt-2 space-y-0.5">
                    {card.lines.map((line) => (
                      <p key={line} className="text-sm text-zinc-400">
                        {line}
                      </p>
                    ))}
                  </div>
                  {card.action && (
                    <a
                      href={card.action.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition hover:text-amber-300"
                    >
                      {card.action.text}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Map & Contact Form */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Map */}
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <div className="border-b border-zinc-800 bg-zinc-900/60 p-4">
                  <h2 className="font-semibold text-white flex items-center gap-2">
                    <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Find Us on the Map
                  </h2>
                </div>
                <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.9!2d73.103!3d33.668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfdfdbbdc64f6b%3A0xabdd9cf6d6c8f90b!2sGulberg%20Arena!5e0!3m2!1sen!2s!4v1704501234567!5m2!1sen!2s&q=33.668,73.103&zoom=17"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  {/* Map Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-zinc-700 bg-zinc-900/95 p-4 backdrop-blur-sm sm:left-auto sm:right-4 sm:w-72">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">Bartlett&apos;s Café</p>
                        <p className="mt-0.5 text-xs text-zinc-400">Gulberg Arena Mall, Block A</p>
                        <a
                          href="https://maps.google.com/?q=Gulberg+Arena+Mall+Islamabad"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300"
                        >
                          Open in Google Maps
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <div className="border-b border-zinc-800 bg-zinc-900/60 p-4">
                  <h2 className="font-semibold text-white flex items-center gap-2">
                    <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Send us a Message
                  </h2>
                </div>
                <div className="p-6">
                  {showSuccess && (
                    <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <p className="text-sm text-emerald-400">
                        Thank you! Your message has been sent. We&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-zinc-300">
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="reservation">Table Reservation</option>
                        <option value="feedback">Feedback</option>
                        <option value="catering">Catering</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-zinc-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>

                  <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
                    <p className="text-xs text-zinc-500">
                      <span className="font-medium text-zinc-400">Note:</span> For immediate assistance, please call us directly at{" "}
                      <a href="tel:03293399440" className="text-amber-400 hover:text-amber-300">
                        0329 3399440
                      </a>
                      . We&apos;re available 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
