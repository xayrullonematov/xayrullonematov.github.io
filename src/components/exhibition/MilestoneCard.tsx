"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { type Milestone, chapters } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

// Milestone visual images
const MILESTONE_IMAGES: Record<string, string> = {
  autotestlar: "/images/generated/autotestlar-mockup.jpg",
  hamma:       "/images/generated/hamma-terminal.jpg",
  reposcope:   "/images/generated/ai-circuit.jpg",
  hammadev:    "/images/generated/hamma-terminal.jpg",
  moviebot:    "/images/generated/survival-phone.jpg",
};

export function MilestoneCard({
  milestone,
  milestoneIndex = 0,
  totalMilestones = 1,
}: {
  milestone: Milestone;
  milestoneIndex?: number;
  totalMilestones?: number;
}) {
  const { isMobile, reducedMotion, state } = useExhibition();
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt — desktop only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    if (isMobile || reducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const { scrollYProgress } = useScroll();
  const TOTAL_CHAPTERS = 8;
  const chapterIndex = chapters.findIndex(ch => ch.id === milestone.chapterId);
  const start = chapterIndex / TOTAL_CHAPTERS;
  const end = (chapterIndex + 1) / TOTAL_CHAPTERS;
  const length = end - start;

  const slotSize = (0.95 - 0.50) / totalMilestones;
  const slotStart = 0.50 + milestoneIndex * slotSize;
  const slotEnd = slotStart + slotSize;
  const fadeDur = Math.min(0.04, slotSize * 0.2);

  const appearStart = start + length * slotStart;
  const appearEnd = start + length * (slotStart + fadeDur);
  const disappearStart = start + length * (slotEnd - fadeDur);
  const disappearEnd = start + length * slotEnd;

  const opacity = useTransform(scrollYProgress, [appearStart, appearEnd, disappearStart, disappearEnd], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [appearStart, appearEnd, disappearStart, disappearEnd], [40, 0, 0, -40]);
  const visibility = useTransform(scrollYProgress, (p) => (p >= appearStart && p <= disappearEnd) ? "visible" : "hidden");

  const isFullyVisible =
    state.activeChapterIndex === chapterIndex &&
    state.progress >= appearStart &&
    state.progress <= disappearEnd;

  const isExpanded = isMobile ? isManuallyExpanded : isFullyVisible;
  const accent = milestone.accent;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-xl mx-auto px-4 md:px-0"
      onClick={() => isMobile && setIsManuallyExpanded(v => !v)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: reducedMotion ? (isFullyVisible ? 1 : 0) : opacity,
        y: reducedMotion ? 0 : cardY,
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        pointerEvents: isFullyVisible ? "auto" : "none",
        visibility: reducedMotion ? (isFullyVisible ? "visible" : "hidden") : visibility,
        transformStyle: "preserve-3d",
        cursor: isMobile ? "pointer" : "default",
      }}
      aria-hidden={!isFullyVisible}
    >
      {/* Connection line + dot — desktop only */}
      <div
        className="hidden md:block absolute top-1/2 -left-20 w-20 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accent}50)` }}
      />
      <motion.div
        className="hidden md:block absolute top-1/2 -left-20 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
        animate={{ scale: isExpanded ? 1.4 : 1, opacity: isExpanded ? 1 : 0.45 }}
      />

      {/* Card — no backdrop-blur, dark gradient background */}
      <div
        className="relative overflow-hidden rounded-lg border transition-colors duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(8,8,12,0.88) 0%, rgba(5,5,8,0.72) 100%)",
          borderColor: isExpanded ? `${accent}55` : `${accent}28`,
          boxShadow: isExpanded ? `0 24px 80px -20px ${accent}22` : "none",
        }}
      >
        {/* Image panel — visible when expanded, subtle always */}
        {MILESTONE_IMAGES[milestone.id] && (
          <div
            className="w-full overflow-hidden"
            style={{ height: isExpanded ? "160px" : "80px", transition: "height 0.45s cubic-bezier(0.25,0.1,0.25,1)" }}
          >
            <div
              style={{
                width: "100%",
                height: "160px",
                backgroundImage: `url('${MILESTONE_IMAGES[milestone.id]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                opacity: isExpanded ? 0.55 : 0.25,
                filter: "saturate(0.7)",
                transition: "opacity 0.4s ease",
              }}
            />
            {/* Gradient fade to card background */}
            <div
              className="absolute left-0 right-0"
              style={{
                bottom: 0,
                height: "80px",
                background: `linear-gradient(to top, rgba(8,8,12,0.95), transparent)`,
                marginTop: "-80px",
                position: "relative",
              }}
            />
          </div>
        )}

        {/* Header */}
        <div className="px-5 py-4 md:px-7 md:py-5 flex items-center justify-between gap-4">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontVariationSettings: "'wght' 600",
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              color: "rgba(240,236,228,0.95)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {milestone.name}
          </h3>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase"
              style={{ color: accent }}
            >
              Artifact
            </span>
            {isMobile && (
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="text-xs"
                style={{ color: `${accent}80` }}
              >
                ▼
              </motion.span>
            )}
          </div>
        </div>

        {/* Expandable body */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 md:px-7 md:pb-6 flex flex-col gap-5">
            <div className="h-px" style={{ background: `${accent}20` }} />

            {[
              { label: "Why", text: milestone.why, italic: false },
              { label: "Capability", text: milestone.capability, italic: false },
              { label: "Proof", text: milestone.proof, italic: true },
            ].map(({ label, text, italic }) => (
              <div key={label}>
                <p
                  className="font-mono text-[9px] tracking-[0.25em] uppercase mb-2"
                  style={{ color: `${accent}70` }}
                >
                  {label}
                </p>
                <p
                  className="font-sans text-sm md:text-[0.95rem] leading-relaxed"
                  style={{ color: "rgba(200,196,188,0.85)", fontStyle: italic ? "italic" : "normal" }}
                >
                  {text}
                </p>
              </div>
            ))}

            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t"
              style={{ borderColor: `${accent}15` }}
            >
              <div className="flex flex-wrap gap-1.5">
                {milestone.stack.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] px-2 py-1 rounded border"
                    style={{
                      borderColor: `${accent}22`,
                      color: "rgba(148,163,184,0.7)",
                      background: `${accent}08`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={milestone.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wide transition-opacity hover:opacity-75"
                style={{ color: accent }}
                onClick={e => e.stopPropagation()}
              >
                {milestone.link.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
