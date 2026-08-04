"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { site, stats } from "@/data/content";
import { AccentButton, GhostButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Ambient backgrounds */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div
        className="gradient-orb top-[-10%] left-[10%] h-[420px] w-[420px] opacity-30"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <div
        className="gradient-orb right-[-5%] bottom-[10%] h-[320px] w-[320px] opacity-20"
        style={{ background: "#3b82f6" }}
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="container relative z-10">
        {/* Status badge */}
        <motion.p
          className="mono mb-8 flex items-center gap-3 text-[11px] tracking-[0.2em] text-muted uppercase"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
          Available for collaborations
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="display max-w-5xl text-[clamp(2.75rem,9vw,6.75rem)] text-balance"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.tagline.split(" ").map((word, i, arr) => (
            <span key={i} className="inline-block">
              {word === "ships." ? (
                <span className="relative inline-block">
                  <span className="relative z-10">{word}</span>
                  <motion.span
                    className="absolute bottom-[0.08em] left-0 h-[0.12em] w-full rounded-full bg-accent/80"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.9,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ originX: 0 }}
                    aria-hidden
                  />
                </span>
              ) : (
                word
              )}
              {i < arr.length - 1 ? "\u00A0" : null}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-xl text-base text-muted md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
        >
          <AccentButton href="#projects">
            View work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </AccentButton>
          <GhostButton href={site.github} target="_blank">
            GitHub profile
          </GhostButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-10 sm:grid-cols-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="display text-2xl tracking-tight md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        aria-hidden
      >
        <span className="mono text-[10px] tracking-[0.2em] text-muted-dim uppercase">
          Scroll
        </span>
        <motion.span
          className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
