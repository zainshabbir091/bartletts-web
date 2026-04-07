import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bartlett’s Café — Gulberg Greens, Islamabad",
    template: "%s | Bartlett’s Café",
  },
  description:
    "Bartlett’s Café is a cozy and elegant coffee spot in Gulberg Greens, Islamabad—premium coffee, freshly prepared food, and a calm ambiance.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Bartlett’s Café",
    description:
      "Premium coffee, freshly prepared food, and a calm ambiance in Gulberg Greens, Islamabad.",
    type: "website",
    locale: "en_US",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-amber-200/60 selection:text-zinc-950">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
