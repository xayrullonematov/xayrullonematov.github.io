"use client";

import { Github, Mail, Send } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export function PortfolioHero() {
  return (
    <MinimalistHero
      logoText="Xayrillo Ne’matov"
      navLinks={[
        { label: "STORY", href: "#story" },
        { label: "PROJECTS", href: "#work" },
        { label: "SMALL WINS", href: "#results" },
        { label: "CONTACT", href: "#contact" },
      ]}
      mainText="I’m a builder from Urgut, Uzbekistan. I learn by making useful things: pickup ordering for bazaar kitchens, offline exam practice, and private tools for remote work."
      readMoreLink="#story"
      imageSrc="/portfolio/portrait.webp"
      imageAlt="Portrait of Xayrillo Ne’matov in a black turtleneck"
      overlayText={{ part1: "learn by", part2: "building." }}
      socialLinks={[
        { icon: Github, href: "https://github.com/xayrullonematov", label: "GitHub" },
        { icon: Send, href: "https://t.me/mr_khayrulloh", label: "Telegram" },
        { icon: Mail, href: "mailto:hello@nematov.com", label: "Email Xayrillo" },
      ]}
      locationText="Urgut → Tashkent, Uzbekistan"
    />
  );
}
