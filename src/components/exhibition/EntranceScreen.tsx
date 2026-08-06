"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/lib/AudioEngine";
import { useExhibition } from "@/lib/ExhibitionContext";

export function EntranceScreen() {
  const [hasEntered, setHasEntered] = useState(false);
  const { reducedMotion } = useExhibition();

  const handleEnter = async () => {
    if (audio) {
      const isPlaying = audio.getState();
      if (!isPlaying) await audio.toggle();
    }
    setHasEntered(true);
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#0a0905" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Breathing parchment glow — prologue accent */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={reducedMotion ? {} : {
              background: [
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,184,154,0.05) 0%, transparent 70%)",
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,184,154,0.09) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,184,154,0.05) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Top rule */}
          <motion.div
            className="absolute top-8 left-8 right-8 h-px"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(200,184,154,0.1)", transformOrigin: "left" }}
          />

          {/* Corner labels */}
          <motion.p
            className="absolute top-6 left-8 font-mono text-[9px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{ color: "rgba(200,184,154,0.3)" }}
          >
            An Interactive Exhibition
          </motion.p>
          <motion.p
            className="absolute top-6 right-8 font-mono text-[9px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{ color: "rgba(200,184,154,0.3)" }}
          >
            2026
          </motion.p>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">

            {/* Title — weight 200, stone era */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="leading-[0.88] tracking-[-0.05em] mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontVariationSettings: "'wght' 200",
                  fontSize: "clamp(2.8rem, 9vw, 6rem)",
                  color: "#f0ece4",
                }}
              >
                From Stone<br />
                <span style={{ color: "rgba(240,236,228,0.2)" }}>to Systems</span>
              </h1>
            </motion.div>

            {/* Name */}
            <motion.p
              className="font-mono text-[9px] tracking-[0.3em] uppercase mb-10"
              style={{ color: "rgba(200,184,154,0.45)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Xayrillo Ne&apos;matov
            </motion.p>

            {/* Divider */}
            <motion.div
              className="h-px w-12 mb-9"
              style={{ background: "rgba(200,184,154,0.15)" }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            />

            {/* Headphones hint */}
            <motion.div
              className="flex items-center gap-2 mb-9"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgba(200,184,154,0.35)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
              </svg>
              <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: "rgba(200,184,154,0.35)" }}>
                Headphones recommended
              </span>
            </motion.div>

            {/* Enter button */}
            <motion.button
              onClick={handleEnter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-9 py-3.5 rounded-full border focus:outline-none transition-all duration-400"
              style={{ borderColor: "rgba(200,184,154,0.2)", color: "rgba(240,236,228,0.75)", background: "transparent" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(200,184,154,0.5)";
                e.currentTarget.style.background = "rgba(200,184,154,0.07)";
                e.currentTarget.style.color = "#f0ece4";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(200,184,154,0.2)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(240,236,228,0.75)";
              }}
            >
              <span className="flex items-center gap-3">
                Enter
                <motion.span
                  animate={reducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>

          {/* Bottom rule */}
          <motion.div
            className="absolute bottom-8 left-8 right-8 h-px"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(200,184,154,0.1)", transformOrigin: "right" }}
          />

          {/* Bottom tagline */}
          <motion.p
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{ color: "rgba(200,184,154,0.18)" }}
          >
            From Stone Age to Cyber Punk
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
