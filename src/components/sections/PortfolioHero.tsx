"use client";

import { Github, Mail, Send } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export function PortfolioHero({ onNavigate }: { onNavigate?: (href: string) => void }) {
  return (
    <MinimalistHero
      onNavigate={onNavigate}
      logoText="Xayrillo Ne’matov"
      navLinks={[
        { label: "STORY", href: "#story" },
        { label: "PROJECTS", href: "#work" },
        { label: "IN PRACTICE", href: "#results" },
        { label: "CONTACT", href: "#contact" },
      ]}
      mainText={<>I’m a builder from <strong className="highlight">Urgut, Uzbekistan.</strong> I build tools for real tasks: practising for a driving exam, managing servers, and running AI locally.</>}
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
