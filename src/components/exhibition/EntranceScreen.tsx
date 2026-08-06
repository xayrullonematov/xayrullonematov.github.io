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
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#030305] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Slow breathing background glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={reducedMotion ? {} : {
              background: [
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(114,87,232,0.07) 0%, transparent 70%)",
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(114,87,232,0.12) 0%, transparent 70%)",
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(114,87,232,0.07) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Thin horizontal rule — top */}
          <motion.div
            className="absolute top-8 left-8 right-8 h-px"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(246,244,239,0.06)", transformOrigin: "left" }}
          />

          {/* Top-left label */}
          <motion.p
            className="absolute top-6 left-8 font-mono text-[9px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ color: "rgba(148,163,184,0.3)" }}
          >
            An Interactive Exhibition
          </motion.p>

          {/* Top-right year */}
          <motion.p
            className="absolute top-6 right-8 font-mono text-[9px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ color: "rgba(148,163,184,0.3)" }}
          >
            2026
          </motion.p>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">

            {/* Title */}
            <motion.h1
              className="font-display font-black tracking-tighter leading-[0.88] text-white mb-4"
              style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              From Stone<br />
              <span style={{ color: "rgba(246,244,239,0.22)" }}>to Systems</span>
            </motion.h1>

            {/* Name */}
            <motion.p
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-12"
              style={{ color: "rgba(148,163,184,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Xayrillo Ne&apos;matov
            </motion.p>

            {/* Divider */}
            <motion.div
              className="h-px w-16 mb-10"
              style={{ background: "rgba(246,244,239,0.1)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            />

            {/* Headphones hint */}
            <motion.div
              className="flex items-center gap-2 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgba(148,163,184,0.4)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
              </svg>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(148,163,184,0.4)" }}>
                Headphones recommended
              </span>
            </motion.div>

            {/* Enter button */}
            <motion.button
              onClick={handleEnter}
              className="group relative font-mono text-[11px] tracking-[0.25em] uppercase px-10 py-4 rounded-full border transition-all duration-500 focus:outline-none"
              style={{
                borderColor: "rgba(246,244,239,0.15)",
                color: "rgba(246,244,239,0.8)",
                background: "transparent",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(114,87,232,0.6)";
                e.currentTarget.style.background = "rgba(114,87,232,0.12)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(246,244,239,0.15)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(246,244,239,0.8)";
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
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(246,244,239,0.06)", transformOrigin: "right" }}
          />

          {/* Bottom tagline */}
          <motion.p
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.25em] uppercase whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{ color: "rgba(148,163,184,0.2)" }}
          >
            From Stone Age to Cyber Punk
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
