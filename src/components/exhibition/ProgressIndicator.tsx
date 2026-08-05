"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useExhibition } from "@/lib/ExhibitionContext";
import { chapters } from "@/data/journey";
import { audio } from "@/lib/AudioEngine";

export function ProgressIndicator() {
  const { state, goToChapter, isMobile, reducedMotion } = useExhibition();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const { scrollYProgress } = useScroll();

  const toggleAudio = async () => {
    if (audio) {
      const isNowPlaying = await audio.toggle();
      if (isNowPlaying !== undefined) {
        setAudioPlaying(isNowPlaying);
      }
    }
  };

  const activeIndex = state.activeChapterIndex;

  // Mobile: Instagram Stories style top progress bars
  if (isMobile) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 px-2 pt-4 pointer-events-none">
        <div className="flex gap-1.5 w-full">
          {chapters.map((chapter, i) => {
            const start = i / chapters.length;
            const end = (i + 1) / chapters.length;
            
            // Map the global scroll progress to 0-100% for this specific chunk
            const width = useTransform(
              scrollYProgress,
              [start, end],
              ["0%", "100%"]
            );
            
            // If we are past this chapter, ensure it stays 100%, if before, 0%
            const fillWidth = useTransform(scrollYProgress, (p) => {
              if (p >= end) return "100%";
              if (p <= start) return "0%";
              return `${((p - start) / (end - start)) * 100}%`;
            });

            return (
              <div key={chapter.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    width: fillWidth,
                    backgroundColor: chapter.palette.primary 
                  }}
                />
              </div>
            );
          })}
        </div>
      </nav>
    );
  }

  // Desktop: Side Dots
  return (
    <nav
      className="fixed z-50 flex flex-col right-8 top-1/2 -translate-y-1/2 w-auto p-0 bg-transparent border-none"
      aria-label="Chapter progress"
    >
      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="absolute -top-16 right-0 p-2 text-white/50 hover:text-white transition-colors focus:outline-none flex items-center justify-center gap-2"
        aria-label={audioPlaying ? "Mute audio" : "Play ambient audio"}
      >
        {audioPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      <ul className="flex flex-col justify-center items-center gap-4 w-auto">
        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isHovered = index === hoveredIndex;

          return (
            <li key={chapter.id} className="relative flex items-center">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-full mr-4 whitespace-nowrap text-sm font-mono tracking-wider"
                    style={{ color: chapter.palette.primary }}
                  >
                    {chapter.title}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => goToChapter(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group flex items-center justify-center p-2 focus:outline-none"
                aria-label={`Go to chapter ${index + 1}: ${chapter.title}`}
                aria-current={isActive ? "step" : undefined}
              >
                <motion.div
                  className="rounded-full transition-all duration-300"
                  animate={{
                    width: isActive ? 12 : isHovered ? 10 : 8,
                    height: isActive ? 12 : isHovered ? 10 : 8,
                    backgroundColor: isActive
                      ? chapter.palette.primary
                      : isPast
                      ? `${chapter.palette.primary}80`
                      : "rgba(255, 255, 255, 0.2)",
                    boxShadow: isActive
                      ? `0 0 12px ${chapter.palette.glow}`
                      : "none",
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.4,
                    ease: "easeOut",
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
