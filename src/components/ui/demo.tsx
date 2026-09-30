"use client";

import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

// Standalone example only: the production portfolio uses its owner's real portrait.
// Replace these example destinations before using this demo on a public route.
export default function MinimalistHeroDemo() {
  return (
    <MinimalistHero
      logoText="mnmlst."
      navLinks={[
        { label: "HOME", href: "#top" },
        { label: "PRODUCT", href: "#product" },
        { label: "STORE", href: "#store" },
        { label: "ABOUT US", href: "#about" },
      ]}
      mainText="A minimalist hero example with a portrait, a bold headline, and space for a short introduction."
      readMoreLink="#about"
      imageSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85"
      imageAlt="Stock portrait of a man outdoors"
      overlayText={{ part1: "less is", part2: "more." }}
      socialLinks={[
        { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
        { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
        { icon: Twitter, href: "https://x.com", label: "X" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
      ]}
      locationText="Arlington Heights, IL"
    />
  );
}
