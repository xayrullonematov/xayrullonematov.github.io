"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/lib/AudioEngine";
import { useExhibition } from "@/lib/ExhibitionContext";

export function EntranceScreen() {
  const [hasEntered, setHasEntered] = useState(false);
  const { isMobile, reducedMotion } = useExhibition();

  const handleEnter = async () => {
    // Start audio context upon user interaction
    if (audio) {
      const isPlaying = audio.getState();
      if (!isPlaying) {
        await audio.toggle();
      }
    }
    setHasEntered(true);
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black backdrop-blur-2xl px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1, ease: "easeInOut" }}
        >
          {/* Subtle animated background glow */}
          <motion.div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full space-y-12">
            
            <div className="space-y-4 text-center">
              <div className="w-8 h-8 md:w-10 md:h-10 mx-auto border border-white/20 rounded-full flex items-center justify-center mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                </svg>
              </div>
              <h2 className="font-display font-medium text-lg md:text-xl text-white/90 tracking-wide">
                Headphones Recommended
              </h2>
              <p className="text-sm text-white/50 font-sans leading-relaxed">
                This exhibition features an evolving cinematic drone that responds to your journey.
              </p>
            </div>

            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs tracking-widest text-white uppercase overflow-hidden rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/10 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter Experience
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
