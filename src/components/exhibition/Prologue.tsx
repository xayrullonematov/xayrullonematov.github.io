"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { siteInfo } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

export function Prologue() {
  const prefersReducedMotion = useReducedMotion();
  const { state } = useExhibition();
  const { scrollYProgress } = useScroll();

  // Prologue is chapter 0 — fades out at 1/8 = 0.125
  const end = 1 / 8;

  const opacity = useTransform(scrollYProgress, [0, end * 0.75, end], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, end], [0, prefersReducedMotion ? 0 : -80]);
  const contentY = useTransform(scrollYProgress, [0, end], [0, prefersReducedMotion ? 0 : -40]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, end * 0.15], [1, 0]);

  const isActive = state.progress <= end;
  const pointerEvents = isActive ? "auto" : "none";
  const visibility = useTransform(scrollYProgress, (p) => (p <= end ? "visible" : "hidden"));

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
      {/* Full-bleed glow from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(246,244,239,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Large ghost title behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-black text-center leading-none"
          style={{
            fontSize: "clamp(12rem, 35vw, 30rem)",
            color: "rgba(246,244,239,0.025)",
            letterSpacing: "-0.06em",
          }}
        >
          FSS
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-14 lg:px-20">

        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-8 md:mb-12"
          style={{ color: "rgba(148,163,184,0.4)" }}
        >
          An Interactive Exhibition · 2026
        </motion.p>

        {/* Title block */}
        <motion.div style={{ y: titleY }}>
          <motion.h1
            id="prologue-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black tracking-tighter leading-[0.88] mb-6 md:mb-8"
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              color: "#f6f4ef",
            }}
          >
            From Stone
            <br />
            <span style={{ color: "rgba(246,244,239,0.2)" }}>to Systems</span>
          </motion.h1>
        </motion.div>

        {/* Author + divider */}
        <motion.div
          style={{ y: contentY }}
          className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <p
              className="font-display text-lg md:text-xl font-semibold mb-1"
              style={{ color: "rgba(246,244,239,0.85)" }}
            >
              {siteInfo.name}
            </p>
            <p
              className="font-mono text-[9px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(148,163,184,0.35)" }}
            >
              {siteInfo.location}
            </p>
          </motion.div>

          {/* Vertical separator */}
          <motion.div
            className="hidden md:block w-px self-stretch"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{ background: "rgba(246,244,239,0.08)", transformOrigin: "top" }}
          />

          {/* Opening statement */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-base md:text-lg italic max-w-sm leading-relaxed"
            style={{ color: "rgba(246,244,239,0.45)" }}
          >
            &ldquo;Every builder begins with a question they cannot yet name.&rdquo;
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll hint — animated arrow */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-10 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(246,244,239,0.4), transparent)" }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ color: "rgba(246,244,239,0.3)" }}>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: "rgba(148,163,184,0.25)" }}>
          Scroll
        </span>
      </motion.div>
    </motion.section>
  );
}
