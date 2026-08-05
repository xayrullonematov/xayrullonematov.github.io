import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xayrullonematov.github.io"),
  title: "From Stone to Systems — Xayrillo Ne'matov",
  description:
    "An interactive exhibition of one builder's journey from countryside curiosity to AI-augmented engineering. Open-source tools, real products, local-first principles.",
  keywords: [
    "Xayrillo Ne'matov",
    "Nematov Xayrillo",
    "xayrullonematov",
    "AI engineer",
    "open source",
    "Hamma",
    "HammaDev",
    "RepoScope",
    "Autotestlar",
    "local-first AI",
    "From Stone to Systems",
    "Samarkand",
    "Uzbekistan",
  ],
  authors: [{ name: "Xayrillo Ne'matov", url: "https://xayrullonematov.github.io" }],
  creator: "Xayrillo Ne'matov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xayrullonematov.github.io",
    title: "From Stone to Systems — Xayrillo Ne'matov",
    description:
      "An interactive exhibition: from countryside curiosity to AI-augmented engineering.",
    siteName: "Xayrillo Ne'matov",
  },
  twitter: {
    card: "summary_large_image",
    title: "From Stone to Systems — Xayrillo Ne'matov",
    description:
      "An interactive exhibition: from countryside curiosity to AI-augmented engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://xayrullonematov.github.io",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrains.variable} h-full antialiased snap-y snap-mandatory`}
    >
      <body className="noise min-h-full bg-bg text-text">
        <SmoothScroll>
          <main id="main">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
