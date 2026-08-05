"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExhibition } from "@/lib/ExhibitionContext";
import { chapters } from "@/data/journey";

import { audio } from "@/lib/AudioEngine";

export function ProgressIndicator() {
  const { state, goToChapter, isMobile, reducedMotion } = useExhibition();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = async () => {
    if (audio) {
      const isNowPlaying = await audio.toggle();
      if (isNowPlaying !== undefined) {
        setAudioPlaying(isNowPlaying);
      }
    }
  };

  const activeIndex = state.activeChapterIndex;

  return (
    <nav
      className="fixed z-50 flex flex-col md:right-8 md:left-auto md:top-1/2 md:-translate-y-1/2 bottom-0 left-0 w-full md:w-auto p-4 md:p-0 md:bg-transparent bg-black/80 md:backdrop-blur-none backdrop-blur-md border-t md:border-t-0 border-white/10"
      aria-label="Chapter progress"
    >
      {/* Audio Toggle */}
      {!isMobile && (
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
      )}
      {/* Mobile Title (Always visible on mobile) */}
      {isMobile && (
        <div className="text-center mb-4 text-xs font-mono uppercase tracking-widest text-white/70">
          {chapters[activeIndex]?.title || ""}
        </div>
      )}

      <ul className="flex md:flex-col flex-row justify-center items-center gap-3 md:gap-4 w-full md:w-auto">
        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isHovered = index === hoveredIndex;

          return (
            <li key={chapter.id} className="relative flex items-center">
              {/* Desktop Hover Label */}
              {!isMobile && (
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
              )}

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
                      ? `${chapter.palette.primary}80` // 50% opacity hex approximation
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
      
      {/* Mobile continuous progress bar line (optional decorative element) */}
      {isMobile && (
        <div className="absolute top-0 left-0 h-[1px] bg-white/10 w-full">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: chapters[activeIndex]?.palette.primary || '#fff' }}
            animate={{ width: `${(activeIndex / (chapters.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      )}
    </nav>
  );
}
