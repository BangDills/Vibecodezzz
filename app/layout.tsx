import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/*
 * Self-host Inter via next/font so the font is inlined at build time — no
 * network request, no FOUT, and the variable is wired into the @theme tokens.
 * `display: 'swap'` keeps text visible during the (instant local) font swap.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vibefolio",
  description:
    "A calm, Apple-inspired portfolio for indie makers and vibe-coders.",
  // Matches the GitHub Pages URL; metadataBase resolves relative OG/Twitter URLs.
  metadataBase: new URL("https://bangdills.github.io/Vibecodezzz"),
  openGraph: {
    title: "Vibefolio",
    description:
      "A calm, Apple-inspired portfolio for indie makers and vibe-coders.",
    type: "website",
  },
};

// Runs before first paint. Motion writes `opacity:0` inline during SSR so the
// enter animations have a starting state — but that means content is invisible
// until the JS bundle hydrates. We mark <html> as "js-ready" only after we know
// JS is executing; a CSS rule forces that content visible in the meantime,
// so there is never a flash of invisible/unstyled content. The script is tiny
// and inlined, so it cannot itself cause a FOUC.
const noFoucScript = `document.documentElement.classList.add('js-ready')`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFoucScript }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
