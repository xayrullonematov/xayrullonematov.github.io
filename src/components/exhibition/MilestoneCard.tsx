"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { type Milestone, chapters } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

export function MilestoneCard({ milestone, milestoneIndex = 0, totalMilestones = 1 }: { milestone: Milestone; milestoneIndex?: number; totalMilestones?: number }) {
  const { isMobile, reducedMotion, state } = useExhibition();
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt effect (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth return
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 200 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    if (isMobile || reducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Use the window scroll to drive the timeline
  const { scrollYProgress } = useScroll();

  const TOTAL_CHAPTERS = 8;
  const chapterId = milestone.chapterId;
  const chapterIndex = chapters.findIndex(ch => ch.id === chapterId);
  const start = chapterIndex / TOTAL_CHAPTERS;
  const end = (chapterIndex + 1) / TOTAL_CHAPTERS;
  const length = end - start;
  
  // Divide the milestone window (0.50 → 0.95) equally among all milestones in
  // this chapter so they appear one at a time instead of all at once.
  // Each slot is: [slotStart, slotEnd] within the chapter's scroll range.
  const milestoneWindowStart = 0.50;
  const milestoneWindowEnd = 0.95;
  const slotSize = (milestoneWindowEnd - milestoneWindowStart) / totalMilestones;
  const slotStart = milestoneWindowStart + milestoneIndex * slotSize;
  const slotEnd = slotStart + slotSize;
  const fadeDuration = Math.min(0.04, slotSize * 0.2);

  const appearStart = start + length * slotStart;
  const appearEnd = start + length * (slotStart + fadeDuration);

  // Disappears at end of its slot
  const disappearStart = start + length * (slotEnd - fadeDuration);
  const disappearEnd = start + length * slotEnd;

  const opacity = useTransform(
    scrollYProgress,
    [appearStart, appearEnd, disappearStart, disappearEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [appearStart, appearEnd, disappearStart, disappearEnd],
    [40, 0, 0, -40]
  );

  const isActiveChapter = state.activeChapterIndex === chapterIndex;
  const isPastAppearPoint = state.progress >= appearStart;
  const isBeforeEnd = state.progress <= disappearEnd;
  const isFullyVisible = isActiveChapter && isPastAppearPoint && isBeforeEnd;
  
  const isExpanded = isMobile ? isManuallyExpanded : isFullyVisible;

  const toggleExpand = () => {
    if (isMobile) setIsManuallyExpanded(!isManuallyExpanded);
  };

  const pointerEvents = isFullyVisible ? "auto" : "none";
  const visibility = useTransform(scrollYProgress, (p) => (p >= appearStart && p <= disappearEnd) ? "visible" : "hidden");

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-2xl mx-auto my-auto cursor-pointer md:cursor-default px-5 md:px-0 pb-24 md:pb-0 perspective-1000"
      onClick={toggleExpand}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        opacity: reducedMotion ? (isFullyVisible ? 1 : 0) : opacity, 
        y: reducedMotion ? 0 : y,
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        pointerEvents, 
        visibility: reducedMotion ? (isFullyVisible ? "visible" : "hidden") : visibility,
        transformStyle: "preserve-3d"
      }}
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
        className="relative overflow-hidden rounded-lg border backdrop-blur-2xl transition-colors duration-500"
        style={{ 
          borderColor: isExpanded ? `${milestone.accent}60` : 'rgba(255,255,255,0.15)',
          backgroundColor: isExpanded ? 'rgba(5,5,8,0.85)' : 'rgba(5,5,8,0.65)',
          boxShadow: isExpanded ? `0 0 40px -10px ${milestone.accent}30` : 'none'
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
