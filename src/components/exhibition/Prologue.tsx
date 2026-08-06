/**
 * FROM STONE TO SYSTEMS — Prologue
 * 
 * The entrance to the exhibition. Before any chapter begins,
 * the visitor encounters the central question and the name.
 * This is the first impression — the moment that sets the tone.
 */

"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { siteInfo } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

export function Prologue() {
  const prefersReducedMotion = useReducedMotion();
  const { state } = useExhibition();

  // Use the window scroll to drive the timeline
  const { scrollYProgress } = useScroll();

  // Prologue is chapter 0. It fades out as we approach chapter 1 (progress 0.125)
  const end = 1 / 8; // 0.125

  const titleY = useTransform(scrollYProgress, [0, end], [0, prefersReducedMotion ? 0 : -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, end * 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [end * 0.1, end * 0.4], [0, 1]);
  const narrativeOpacity = useTransform(scrollYProgress, [end * 0.2, end * 0.5], [0, 1]);
  const narrativeY = useTransform(scrollYProgress, [end * 0.2, end * 0.5], [30, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, end * 0.2], [1, 0]);
  const opacity = useTransform(scrollYProgress, [0, end * 0.8, end], [1, 1, 0]);
  const isActive = state.progress <= end;
  const pointerEvents = isActive ? "auto" : "none";
  const visibility = useTransform(scrollYProgress, (p) => p <= end ? "visible" : "hidden");

  return (
    <motion.section
      id="prologue"
      className="absolute inset-0 flex flex-col justify-start pt-[30vh] md:pt-[35vh] overflow-hidden"
      aria-labelledby="prologue-title"
      style={prefersReducedMotion ? { opacity: isActive ? 1 : 0, pointerEvents, visibility: isActive ? "visible" : "hidden" } : { opacity, pointerEvents, visibility }}
      aria-hidden={!isActive}
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-8">
        {/* The name — large, confident, minimal */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mb-6 md:mb-8"
            style={{ color: "rgba(148, 163, 184, 0.5)" }}
          >
            An interactive exhibition
          </motion.p>

          <motion.h1
            id="prologue-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] mb-6 text-balance"
            style={{
              fontFamily: "var(--font-display), var(--font-sans), system-ui, sans-serif",
              color: "#f6f4ef",
            }}
          >
            From Stone
            <br />
            <span style={{ color: "rgba(246, 244, 239, 0.25)" }}>to Systems</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-24 md:w-32 origin-left mb-6"
            style={{ background: "rgba(246, 244, 239, 0.15)" }}
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-sm md:text-base"
            style={{
              color: "rgba(148, 163, 184, 0.7)",
              fontFamily: "var(--font-display)",
            }}
          >
            {siteInfo.name}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1"
            style={{ color: "rgba(148, 163, 184, 0.35)" }}
          >
            {siteInfo.location}
          </motion.p>
        </motion.div>

        {/* Opening question — appears as you begin to scroll */}
        <motion.div
          style={{ opacity: subtitleOpacity }}
          className="mt-24 md:mt-32"
        >
          <p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed italic max-w-2xl"
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(246, 244, 239, 0.6)",
            }}
          >
            &ldquo;Every builder begins with a question they cannot yet name.&rdquo;
          </p>
        </motion.div>

        {/* Narrative — appears further into scroll */}
        <motion.div
          style={{ opacity: narrativeOpacity, y: prefersReducedMotion ? 0 : narrativeY }}
          className="mt-12 md:mt-16"
        >
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(148, 163, 184, 0.7)" }}
          >
            This is not a portfolio. This is a map of how one person learned
            to build — from the ground, from nothing, from pure curiosity —
            and why every tool, every line of code, every system traces back
            to a single question:
          </p>
          <p
            className="text-lg md:text-xl mt-6 font-medium"
            style={{
              fontFamily: "var(--font-display)",
              color: "rgba(246, 244, 239, 0.85)",
            }}
          >
            &ldquo;What if I could make this work?&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(148, 163, 184, 0.3)" }}
        >
          Scroll to begin
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(148, 163, 184, 0.3), transparent)" }}
        />
      </motion.div>
    </motion.section>
  );
}
