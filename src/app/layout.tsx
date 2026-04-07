import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Script from "next/script";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="strip-extension-attrs" strategy="beforeInteractive">{`
          (function () {
            try {
              var attrRe = /^(bis_|__processed_)/;
              var extra = new Set(["bis_register"]);
              function cleanEl(el) {
                if (!el || !el.attributes) return;
                for (var j = el.attributes.length - 1; j >= 0; j--) {
                  var name = el.attributes[j].name;
                  if (attrRe.test(name) || extra.has(name)) el.removeAttribute(name);
                }
              }

              // Initial sweep
              var nodes = document.querySelectorAll("*");
              for (var i = 0; i < nodes.length; i++) cleanEl(nodes[i]);

              // Keep stripping if an extension re-injects during load.
              var mo = new MutationObserver(function (mutations) {
                for (var m = 0; m < mutations.length; m++) {
                  var mu = mutations[m];
                  if (mu.type === "attributes") {
                    var n = mu.attributeName;
                    if (n && (attrRe.test(n) || extra.has(n))) {
                      mu.target && mu.target.removeAttribute && mu.target.removeAttribute(n);
                    }
                  } else if (mu.type === "childList") {
                    if (mu.addedNodes) {
                      for (var k = 0; k < mu.addedNodes.length; k++) {
                        var node = mu.addedNodes[k];
                        if (node && node.nodeType === 1) {
                          cleanEl(node);
                          var descendants = node.querySelectorAll ? node.querySelectorAll("*") : [];
                          for (var d = 0; d < descendants.length; d++) cleanEl(descendants[d]);
                        }
                      }
                    }
                  }
                }
              });
              mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true });
            } catch (_) {}
          })();
        `}</Script>
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-amber-200/60 selection:text-zinc-950"
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
