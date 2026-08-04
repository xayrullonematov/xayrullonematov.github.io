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

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Ambient brand gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="gradient-orb top-[-10%] left-[10%] h-[500px] w-[500px] opacity-20"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <div
        className="gradient-orb right-[5%] bottom-[10%] h-[400px] w-[400px] opacity-15"
        style={{ background: "var(--accent-purple)" }}
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left column: Copy & CTAs */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <motion.div
              className="mono mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-surface/80 px-4 py-2 backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] tracking-[0.16em] text-muted uppercase">
                {site.bio}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="display text-[clamp(2.5rem,7vw,5.5rem)] text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Building AI software that{" "}
              <span className="relative inline-block text-accent">
                ships.
                <motion.span
                  className="absolute bottom-[0.08em] left-0 h-[0.12em] w-full rounded-full bg-accent/80"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  aria-hidden
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 max-w-xl text-base text-muted md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.subtitle}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <AccentButton href="#projects">
                Explore Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </AccentButton>
              <GhostButton href={site.github} target="_blank">
                GitHub Profile
              </GhostButton>
            </motion.div>
          </div>

          {/* Right column: Bespoke Hamma Labs Software Topology UI Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 glass-panel p-5 shadow-2xl transition-all duration-500 hover:border-accent/40">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b11] p-5 flex flex-col justify-between select-none">
                
                {/* Top Bar with PNG Logo & Studio Info */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/logo.png"
                      alt="Hamma Labs Logo"
                      className="h-9 w-9 rounded-xl object-contain p-0.5 border border-white/10 bg-[#0e131d]"
                    />
                    <div>
                      <h3 className="mono text-xs font-semibold text-text">Hamma Labs</h3>
                      <p className="mono text-[10px] text-accent">Local-First AI Studio</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20">
                    AIR-GAPPED
                  </span>
                </div>

                {/* Center Software Architecture Nodes Visual */}
                <div className="my-4 py-4 space-y-2 font-mono text-xs">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-3">Flagship Systems</div>
                  
                  {/* System Node 1 */}
                  <div className="p-2.5 rounded-lg bg-[#0e1420] border border-accent/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-slate-200 font-semibold">HammaDev</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Agent Memory Engine</span>
                  </div>

                  {/* System Node 2 */}
                  <div className="p-2.5 rounded-lg bg-[#0e1420] border border-purple-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-slate-200 font-semibold">Hamma</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Local AI SSH Client</span>
                  </div>

                  {/* System Node 3 */}
                  <div className="p-2.5 rounded-lg bg-[#0e1420] border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span className="text-slate-200 font-semibold">RepoScope</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Multi-Agent Review</span>
                  </div>
                </div>

                {/* Bottom System Status Summary */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Zero Telemetry</span>
                  <span className="text-accent font-semibold">3 Flagship Products</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-10 sm:grid-cols-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-white/10 pl-4 sm:pl-6">
              <p className="display text-2xl tracking-tight text-text md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 mono text-xs text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
