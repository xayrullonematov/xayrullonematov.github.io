"use client";

import { CanvasScrollScrubber } from "./CanvasScrollScrubber";

const projectConfigs: Record<
  string,
  {
    images: string[];
    alt: string;
    badge: string;
    badgeColor: string;
  }
> = {
  memory: {
    images: ["/images/hammadev.jpg", "/images/hamma.jpg", "/images/reposcope.jpg"],
    alt: "HammaDev Persistent AI Agent Memory Interface",
    badge: "Persistent Memory Engine",
    badgeColor: "#F06F52", // Electric Coral
  },
  terminal: {
    images: ["/images/hamma.jpg", "/images/hammadev.jpg", "/images/hero_sphere.jpg"],
    alt: "Hamma AI-Powered SSH Fleet Client Interface",
    badge: "On-Device Local AI",
    badgeColor: "#7257E8", // Deep Violet
  },
  swarm: {
    images: ["/images/reposcope.jpg", "/images/hammadev.jpg", "/images/hamma.jpg"],
    alt: "RepoScope Multi-Agent Code Review Room Interface",
    badge: "Adversarial Multi-Agent Swarm",
    badgeColor: "#F06F52",
  },
};

export function ProjectVisual({
  type,
  accent: _accent = "#F06F52",
  className,
}: {
  type: "memory" | "terminal" | "swarm" | string;
  accent?: string;
  className?: string;
}) {
  const config = projectConfigs[type] || projectConfigs.memory;

  return (
    <CanvasScrollScrubber
      images={config.images}
      title={config.alt}
      badge={config.badge}
      badgeColor={config.badgeColor || _accent}
      className={className}
    />
  );
}
