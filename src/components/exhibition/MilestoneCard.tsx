"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { type Milestone, chapters } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const { isMobile, reducedMotion, state } = useExhibition();
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  // Use the window scroll to drive the timeline
  const { scrollYProgress } = useScroll();

  const TOTAL_CHAPTERS = 8;
  const chapterId = milestone.chapterId;
  const chapterIndex = chapters.findIndex(ch => ch.id === chapterId);
  const start = chapterIndex / TOTAL_CHAPTERS;
  const end = (chapterIndex + 1) / TOTAL_CHAPTERS;
  
  // Appears halfway through the chapter's scroll length
  const appear = start + (end - start) * 0.4;
  const fade = 0.03;

  const opacity = useTransform(
    scrollYProgress,
    [appear - fade, appear + fade, end - fade, end + fade],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [appear - fade, appear + fade, end - fade, end + fade],
    [40, 0, 0, -40]
  );

  const isActiveChapter = state.activeChapterIndex === chapterIndex;
  const isPastAppearPoint = state.progress >= appear - fade;
  const isBeforeEnd = state.progress <= end + fade;
  const isFullyVisible = isActiveChapter && isPastAppearPoint && isBeforeEnd;
  
  const isExpanded = isMobile ? isManuallyExpanded : (isActiveChapter && isPastAppearPoint);

  const toggleExpand = () => {
    if (isMobile) setIsManuallyExpanded(!isManuallyExpanded);
  };

  const pointerEvents = isFullyVisible ? "auto" : "none";
  const visibility = useTransform(scrollYProgress, (p) => (p >= appear - fade && p <= end + fade) ? "visible" : "hidden");

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto my-auto cursor-pointer md:cursor-default"
      onClick={toggleExpand}
      style={reducedMotion ? { opacity: isFullyVisible ? 1 : 0, pointerEvents, visibility: isFullyVisible ? "visible" : "hidden" } : { opacity, y, pointerEvents, visibility }}
      aria-hidden={!isFullyVisible}
    >
      {/* Decorative connection line to Canvas */}
      <div 
        className="absolute top-1/2 -left-8 md:-left-24 w-8 md:w-24 h-px bg-gradient-to-r from-transparent to-current opacity-30"
        style={{ color: milestone.accent }}
      />
      
      {/* Marker dot */}
      <motion.div 
        className="absolute top-1/2 -left-8 md:-left-24 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ backgroundColor: milestone.accent, boxShadow: `0 0 10px ${milestone.accent}` }}
        animate={{ 
          scale: isExpanded ? 1.5 : 1,
          opacity: isExpanded ? 1 : 0.5
        }}
      />

      <div 
        className="relative overflow-hidden rounded-lg border backdrop-blur-xl transition-colors duration-500"
        style={{ 
          borderColor: isExpanded ? `${milestone.accent}40` : 'rgba(255,255,255,0.1)',
          backgroundColor: isExpanded ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)',
          boxShadow: isExpanded ? `0 0 40px -10px ${milestone.accent}20` : 'none'
        }}
      >
        {/* Header - Always visible */}
        <div className="p-5 md:p-8 flex items-center justify-between">
          <h3 className="font-display text-lg md:text-2xl font-semibold tracking-tight text-white/90">
            {milestone.name}
          </h3>
          
          <div className="flex items-center gap-3">
            <span 
              className="text-[10px] md:text-xs font-mono tracking-widest uppercase"
              style={{ color: milestone.accent }}
            >
              Artifact
            </span>
            {isMobile && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="w-4 h-4 flex items-center justify-center opacity-50"
              >
                ▼
              </motion.div>
            )}
          </div>
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="p-5 md:p-8 pt-0 space-y-6 md:space-y-8">
            
            <div className="space-y-1.5 md:space-y-2">
              <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest">Why</h4>
              <p className="text-white/80 font-sans leading-relaxed text-sm md:text-base">
                {milestone.why}
              </p>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest">Capability</h4>
              <p className="text-white/90 font-sans leading-relaxed font-medium text-sm md:text-base">
                {milestone.capability}
              </p>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <h4 className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest">Proof</h4>
              <p className="text-white/70 font-sans leading-relaxed italic text-sm md:text-base">
                {milestone.proof}
              </p>
            </div>

            <div className="pt-5 md:pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
              <div className="flex flex-wrap gap-2">
                {milestone.stack.map(tech => (
                  <span 
                    key={tech} 
                    className="text-[10px] md:text-xs font-mono px-2 py-1 rounded border border-white/10 bg-white/5 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <a
                href={milestone.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-medium transition-colors hover:text-white"
                style={{ color: milestone.accent }}
                onClick={(e) => e.stopPropagation()}
              >
                {milestone.link.label}
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
