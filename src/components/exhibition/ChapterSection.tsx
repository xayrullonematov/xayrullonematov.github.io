"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { type Chapter } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

export function ChapterSection({ chapter, hasMilestone = false }: { chapter: Chapter, hasMilestone?: boolean }) {
  const { isMobile, reducedMotion, state } = useExhibition();

  // Use the window scroll to drive the timeline
  const { scrollYProgress } = useScroll();

  const TOTAL_CHAPTERS = 8;
  const start = chapter.index / TOTAL_CHAPTERS;
  const end = (chapter.index + 1) / TOTAL_CHAPTERS;
  const fade = 0.03;

  // If a milestone exists, we fade the chapter text out early
  // so the milestone can take over the screen. This creates a slide sequence.
  const fadeOutPoint = hasMilestone ? start + (end - start) * 0.45 : end;

  const opacity = useTransform(
    scrollYProgress,
    [start - fade, start + fade, fadeOutPoint - fade, fadeOutPoint + fade],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start - fade, start + fade, fadeOutPoint - fade, fadeOutPoint + fade],
    [50, 0, 0, -50]
  );
  
  // Only allow interactions when fully visible
  const isActive = (state.progress >= start - fade && state.progress <= fadeOutPoint + fade);
  const pointerEvents = isActive ? "auto" : "none";
  const visibility = useTransform(scrollYProgress, (p) => (p >= start - fade && p <= fadeOutPoint + fade) ? "visible" : "hidden");

  // Determine typography classes based on chapter index
  const getTypographyClasses = (index: number) => {
    if (index <= 2) {
      return "font-sans font-light tracking-wide"; // Handwritten/organic feel
    } else if (index <= 4) {
      return "font-sans font-medium tracking-normal"; // Structured
    } else {
      return "font-mono font-normal tracking-tight"; // Technical
    }
  };

  const typoClass = getTypographyClasses(chapter.index);

  return (
    <motion.section 
      id={`chapter-${chapter.index}`}
      className="absolute inset-0 flex flex-col justify-center pt-8 pb-32 md:py-32 px-5 md:px-12 lg:px-24 pointer-events-none"
      style={reducedMotion ? { opacity: state.activeChapterIndex === chapter.index ? 1 : 0, visibility: state.activeChapterIndex === chapter.index ? "visible" : "hidden" } : { opacity, visibility }}
      aria-hidden={!isActive}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${chapter.palette.glow} 0%, transparent 70%)`
        }}
      />

      {/* Large Chapter Watermark - slightly higher on mobile */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden select-none pb-24 md:pb-0">
        <span 
          className="text-[40vw] font-display font-bold text-white/[0.02] leading-none text-center"
        >
          {String(chapter.index).padStart(2, '0')}
        </span>
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl w-full mx-auto"
        style={reducedMotion ? { pointerEvents } : { y, pointerEvents }}
      >
        <div className="flex flex-col justify-center space-y-4 md:space-y-16 h-full max-h-[85dvh] md:max-h-none overflow-hidden">
          
          {/* Header */}
          <div className="space-y-1.5 md:space-y-4">
            <motion.div 
              className="flex items-center gap-3 md:gap-4"
            >
              <span className="text-[10px] md:text-sm font-mono tracking-widest text-white/50">
                CH {String(chapter.index).padStart(2, '0')}
              </span>
              <div className="h-px w-6 md:w-12 bg-white/20" />
              <span 
                className="text-[10px] md:text-sm font-mono tracking-widest uppercase"
                style={{ color: chapter.palette.primary }}
              >
                {chapter.primitive}
              </span>
            </motion.div>

            <motion.h2 
              className="font-display text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              {chapter.title}
            </motion.h2>

            <motion.p 
              className="text-sm md:text-2xl text-white/60 font-sans"
            >
              {chapter.subtitle}
            </motion.p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16 pt-2 md:pt-0">
            
            {/* Left Column - Opening & Anchor */}
            <div className="md:col-span-5 flex flex-col gap-4 md:space-y-12">
              <motion.blockquote 
                className={`text-lg md:text-3xl leading-snug text-white/90 border-l-2 pl-3 md:pl-6 ${typoClass}`}
                style={{ borderColor: chapter.palette.primary }}
              >
                "{chapter.opening}"
              </motion.blockquote>

              {chapter.anchor && (
                <motion.div
                  className="hidden md:block p-4 md:p-6 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                >
                  <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest mb-1 md:mb-2">Anchor Object</h4>
                  <div className="text-white/80 font-medium text-sm md:text-base mb-1">{chapter.anchor.object}</div>
                  <div className="text-white/50 text-xs md:text-sm italic">{chapter.anchor.meaning}</div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Narrative */}
            <div className="md:col-span-7">
              <motion.p
                className={`text-[13px] md:text-xl text-white/70 leading-relaxed md:leading-relaxed ${typoClass}`}
              >
                {chapter.narrative}
              </motion.p>
            </div>
            
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
