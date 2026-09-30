import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nematov.com"),
  title: "Xayrillo Ne’matov — A builder from Urgut",
  description: "Xayrillo Ne’matov builds useful products from problems close to home. Projects, lessons, and a journey from Urgut, Uzbekistan.",
  authors: [{ name: "Xayrillo Ne’matov", url: "https://nematov.com" }],
  openGraph: {
    type: "website", locale: "en_US", url: "https://nematov.com",
    title: "Xayrillo Ne’matov — A builder from Urgut",
    description: "Useful products, honest lessons, and a builder’s journey from Uzbekistan.",
    siteName: "Xayrillo Ne’matov",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xayrillo Ne’matov — A builder from Urgut",
    description: "Useful products, honest lessons, and a builder’s journey from Uzbekistan.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://nematov.com" },
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23141311'/%3E%3Cpath d='M16 18h7l9 13 9-13h7L36 36v10h-8V36z' fill='%23c49a82'/%3E%3C/svg%3E" },
};

export const viewport: Viewport = {
  themeColor: "#141311", colorScheme: "dark", width: "device-width", initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
