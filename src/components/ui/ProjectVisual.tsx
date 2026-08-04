"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projectImages: Record<string, { src: string; alt: string; badge: string; badgeColor: string }> = {
  memory: {
    src: "/images/hammadev.jpg",
    alt: "HammaDev Persistent AI Agent Memory Interface",
    badge: "Persistent Memory Engine",
    badgeColor: "#6C63FF",
  },
  terminal: {
    src: "/images/hamma.jpg",
    alt: "Hamma AI-Powered SSH Fleet Client Interface",
    badge: "On-Device Local AI",
    badgeColor: "#00D4AA",
  },
  swarm: {
    src: "/images/reposcope.jpg",
    alt: "RepoScope Multi-Agent Code Review Room Interface",
    badge: "Adversarial Multi-Agent Swarm",
    badgeColor: "#A78BFA",
  },
};

export function ProjectVisual({
  type,
  accent = "#6C63FF",
  className,
}: {
  type: "memory" | "terminal" | "swarm" | string;
  accent?: string;
  className?: string;
}) {
  const item = projectImages[type] || projectImages.memory;

  return (
    <div
      className={cn(
        "group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08080c] shadow-2xl transition-all duration-500 hover:border-white/[0.2]",
        className
      )}
      data-cursor="hover"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full opacity-30 blur-[80px] transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      {/* High-res project mockup image */}
      <div className="relative h-full w-full overflow-hidden p-3 sm:p-4">
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0c12] shadow-xl">
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Floating tech badge overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 backdrop-blur-md"
          >
            <span
              className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: item.badgeColor, color: item.badgeColor }}
            />
            <span className="mono text-[10px] tracking-wide text-white/90">
              {item.badge}
            </span>
          </motion.div>

          {/* Vignette & glass highlight */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        </div>
      </div>
    </div>
  );
}
