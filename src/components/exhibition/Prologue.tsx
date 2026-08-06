"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { siteInfo } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";
import { CurtainReveal } from "@/components/ui/CurtainReveal";

export function Prologue() {
  const prefersReducedMotion = useReducedMotion();
  const { state } = useExhibition();
  const { scrollYProgress } = useScroll();

  // Prologue occupies 0→0.125 of total scroll
  const end = 1 / 8;

  const opacity = useTransform(scrollYProgress, [0, end * 0.75, end], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, end], [0, prefersReducedMotion ? 0 : -60]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, end * 0.15], [1, 0]);
  const visibility = useTransform(scrollYProgress, (p) => (p <= end ? "visible" : "hidden"));

  const isActive = state.progress <= end;
  const pointerEvents = isActive ? "auto" : "none";

  return (
    <motion.section
      id="prologue"
      className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none"
      aria-labelledby="prologue-title"
      style={
        prefersReducedMotion
          ? { opacity: isActive ? 1 : 0, pointerEvents, visibility: isActive ? "visible" : "hidden" }
          : { opacity, pointerEvents, visibility }
      }
      aria-hidden={!isActive}
    >
      {/* Stone texture background — prologue era */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/generated/stone-prologue.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          mixBlendMode: "luminosity",
        }}
      />

      {/* Subtle top-edge glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 40% at 50% -5%, rgba(200,184,154,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Title block */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 px-[6vw]"
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase mb-8 md:mb-10"
          style={{ color: "rgba(200,184,154,0.35)" }}
        >
          An Interactive Exhibition · 2026
        </motion.p>

        {/* Main title — Bricolage Grotesque at weight 200 (stone era) */}
        <div id="prologue-title">
          <CurtainReveal isActive={isActive} delay={0.2} duration={0.9}>
            <h1
              className="leading-[0.88] tracking-[-0.05em]"
              style={{
                fontFamily: "var(--font-display)",
                fontVariationSettings: "'wght' 200",
                fontSize: "clamp(4.5rem, 14vw, 12rem)",
                color: "#f0ece4",
              }}
            >
              From Stone
            </h1>
          </CurtainReveal>

          <CurtainReveal isActive={isActive} delay={0.45} duration={0.9}>
            <h1
              className="leading-[0.88] tracking-[-0.05em]"
              style={{
                fontFamily: "var(--font-display)",
                fontVariationSettings: "'wght' 200",
                fontSize: "clamp(4.5rem, 14vw, 12rem)",
                color: "rgba(240,236,228,0.18)",
              }}
            >
              to Systems
            </h1>
          </CurtainReveal>
        </div>

        {/* Author line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-8 md:mt-10 flex items-center gap-4"
        >
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(200,184,154,0.45)" }}
          >
            {siteInfo.name.toUpperCase()} · {siteInfo.location.toUpperCase()}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className="w-px h-10 rounded-full"
            style={{ background: "linear-gradient(to bottom, rgba(200,184,154,0.5), transparent)" }}
          />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="rgba(200,184,154,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(200,184,154,0.25)" }}>
          Scroll
        </span>
      </motion.div>
    </motion.section>
  );
}
