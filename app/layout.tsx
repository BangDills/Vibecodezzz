import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
