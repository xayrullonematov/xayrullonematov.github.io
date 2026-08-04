"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { site, stats } from "@/data/content";
import { AccentButton, GhostButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [heroTab, setHeroTab] = useState<"architecture" | "memory" | "fleet">("architecture");

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
              className="mt-6 max-w-xl text-base text-muted md:text-lg leading-relaxed font-sans"
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

          {/* Right column: Award-Quality Interactive 4K macOS Desktop Showcase Centerpiece */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 glass-panel shadow-2xl transition-all duration-500 hover:border-accent/40">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080b11] flex flex-col justify-between select-none">
                
                {/* Window Control & Interactive Tab Bar */}
                <div className="h-10 bg-[#10141e] border-b border-slate-800 flex items-center justify-between px-3.5 z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
                    </div>

                    <div className="flex items-center gap-1 bg-[#06080d] p-0.5 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setHeroTab("architecture")}
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-sans font-medium transition-colors",
                          heroTab === "architecture" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        Topology
                      </button>
                      <button
                        onClick={() => setHeroTab("memory")}
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-sans font-medium transition-colors",
                          heroTab === "memory" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        HammaDev
                      </button>
                      <button
                        onClick={() => setHeroTab("fleet")}
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-sans font-medium transition-colors",
                          heroTab === "fleet" ? "bg-accent/20 text-accent font-semibold" : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        Hamma
                      </button>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-mono border border-emerald-500/20 hidden sm:block">
                    AIR-GAPPED
                  </span>
                </div>

                {/* Main Interactive Screen Content */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-[#06080e] overflow-hidden">
                  
                  {heroTab === "architecture" && (
                    <div className="space-y-3 font-mono text-xs my-auto">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src="/images/logo.png"
                            alt="Hamma Labs Logo"
                            className="h-8 w-8 rounded-lg object-contain p-0.5 border border-white/10 bg-[#0e131d]"
                          />
                          <div>
                            <h3 className="mono text-xs font-semibold text-text">Hamma Labs Studio</h3>
                            <p className="mono text-[10px] text-accent">Local-First Systems</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold">0 Cloud Sync</span>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="p-2 rounded bg-[#0d121c] border border-accent/30 flex items-center justify-between">
                          <span className="text-slate-200 font-semibold text-[11px]">HammaDev Memory</span>
                          <span className="text-accent text-[9px]">Epoch Contract</span>
                        </div>
                        <div className="p-2 rounded bg-[#0d121c] border border-purple-500/30 flex items-center justify-between">
                          <span className="text-slate-200 font-semibold text-[11px]">Hamma Local AI SSH</span>
                          <span className="text-purple-400 text-[9px]">Loopback Locked</span>
                        </div>
                        <div className="p-2 rounded bg-[#0d121c] border border-slate-800 flex items-center justify-between">
                          <span className="text-slate-200 font-semibold text-[11px]">RepoScope Swarm</span>
                          <span className="text-slate-400 text-[9px]">4-Agent Review</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroTab === "memory" && (
                    <div className="space-y-2 font-mono text-[10px] text-slate-300 my-auto bg-[#090d14] p-3 rounded-lg border border-slate-800">
                      <div className="text-accent font-semibold border-b border-slate-800 pb-1">{`// HammaDev Persistent Agent State`}</div>
                      <div><span className="text-purple-400">{`"activeAgent"`}</span>: <span className="text-emerald-300">{`"Claude 3.7 Sonnet"`}</span>,</div>
                      <div><span className="text-purple-400">{`"handoffHistory"`}</span>: [<span className="text-slate-400">{`"Codex", "Grok3"`}</span>],</div>
                      <div><span className="text-purple-400">{`"telemetry"`}</span>: <span className="text-rose-400">false</span></div>
                    </div>
                  )}

                  {heroTab === "fleet" && (
                    <div className="space-y-2 font-mono text-[10px] text-slate-300 my-auto bg-[#090d14] p-3 rounded-lg border border-slate-800">
                      <div className="text-purple-300 font-semibold border-b border-slate-800 pb-1">{`// Hamma AI SSH Fleet Nodes`}</div>
                      <div className="flex justify-between text-slate-400">
                        <span>alpha.hamma.local</span> <span className="text-emerald-400">ONLINE</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>delta.hamma.ai</span> <span className="text-purple-300">AIR-GAPPED</span>
                      </div>
                    </div>
                  )}

                  {/* Glass Card Footer */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Samarkand, UZ</span>
                    <span className="text-accent font-semibold">3 Flagship Products</span>
                  </div>

                </div>
              </div>

              {/* Glass Glare */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
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
