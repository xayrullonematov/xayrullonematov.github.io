"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useExhibition } from "@/lib/ExhibitionContext";
import { chapters } from "@/data/journey";
import { audio } from "@/lib/AudioEngine";

// Chapter accent stops for the progress line color
const STOPS = chapters.map((_, i) => i / (chapters.length - 1));
const ACCENTS = chapters.map(ch => ch.palette.primary);

// Per-chapter progress bar — extracted to respect Rules of Hooks
function StoryBar({ index }: { index: number }) {
  const { scrollYProgress } = useScroll();
  const start = index / chapters.length;
  const end = (index + 1) / chapters.length;
  const fillWidth = useTransform(scrollYProgress, (p) => {
    if (p >= end) return "100%";
    if (p <= start) return "0%";
    return `${((p - start) / (end - start)) * 100}%`;
  });
  return (
    <div className="h-[2px] flex-1 rounded-full overflow-hidden" style={{ background: "rgba(240,236,228,0.1)" }}>
      <motion.div className="h-full rounded-full" style={{ width: fillWidth, backgroundColor: chapters[index].palette.primary }} />
    </div>
  );
}

export function ProgressIndicator() {
  const { state, goToChapter, isMobile, reducedMotion } = useExhibition();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { scrollYProgress } = useScroll();

  const toggleAudio = async () => {
    if (audio) {
      const playing = await audio.toggle();
      if (playing !== undefined) setAudioPlaying(playing);
    }
  };

  // Single line color transitions through chapter accents
  const lineColor = useTransform(scrollYProgress, STOPS, ACCENTS);

  // ── Mobile: single thin progress line at the bottom ─────────────────
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
        <div className="w-full h-[2px]" style={{ background: "rgba(240,236,228,0.08)" }}>
          <motion.div
            className="h-full origin-left"
            style={{ scaleX: scrollYProgress, backgroundColor: lineColor }}
          />
        </div>
      </div>
    );
  }

  // ── Desktop: side dots + audio toggle ───────────────────────────────
  const activeIndex = state.activeChapterIndex;

  return (
    <nav
      className="fixed z-50 right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
      aria-label="Chapter progress"
    >
      {/* Audio toggle */}
      <button
        onClick={toggleAudio}
        className="mb-4 p-2 transition-opacity hover:opacity-100 opacity-40 focus:outline-none"
        style={{ color: "rgba(240,236,228,0.8)" }}
        aria-label={audioPlaying ? "Mute audio" : "Play ambient audio"}
      >
        {audioPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      <ul className="flex flex-col items-center gap-3">
        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isHovered = index === hoveredIndex;

          return (
            <li key={chapter.id} className="relative flex items-center">
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: chapter.palette.primary }}
                  >
                    {chapter.title}
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                onClick={() => goToChapter(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center justify-center p-2 focus:outline-none"
                aria-label={`Go to ${chapter.title}`}
                aria-current={isActive ? "step" : undefined}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: isActive ? 10 : isHovered ? 8 : 6,
                    height: isActive ? 10 : isHovered ? 8 : 6,
                    backgroundColor: isActive
                      ? chapter.palette.primary
                      : isPast
                        ? `${chapter.palette.primary}70`
                        : "rgba(240,236,228,0.2)",
                    boxShadow: isActive ? `0 0 10px ${chapter.palette.primary}` : "none",
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
