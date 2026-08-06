"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type Chapter } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function ChapterSection({ chapter, hasMilestone = false }: { chapter: Chapter, hasMilestone?: boolean }) {
  const { reducedMotion, state } = useExhibition();
  const { scrollYProgress } = useScroll();

  const TOTAL_CHAPTERS = 8;
  const start = chapter.index / TOTAL_CHAPTERS;
  const end = (chapter.index + 1) / TOTAL_CHAPTERS;

  const fadeOutPoint = hasMilestone ? start + (end - start) * 0.40 : end;
  const maxFade = (fadeOutPoint - start) / 2.1;
  const fade = Math.min(0.03, maxFade);

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

  const isActive = state.progress >= start - fade && state.progress <= fadeOutPoint + fade;
  const pointerEvents = isActive ? "auto" : "none";
  const visibility = useTransform(
    scrollYProgress,
    (p) => (p >= start - fade && p <= fadeOutPoint + fade) ? "visible" : "hidden"
  );

  const accent = chapter.palette.primary;

  const in_ = (delay: number) => ({
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // Split narrative into sentences for stagger
  const sentences = chapter.narrative.split(/(?<=\.)\s+/);

  return (
    <motion.section
      id={`chapter-${chapter.index}`}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden"
      style={
        reducedMotion
          ? {
              opacity: state.activeChapterIndex === chapter.index ? 1 : 0,
              visibility: state.activeChapterIndex === chapter.index ? "visible" : "hidden",
            }
          : { opacity, visibility }
      }
      aria-hidden={!isActive}
    >
      {/* Strong radial glow from bottom-left, unique per chapter */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 0% 100%, ${accent}18 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 100% 0%, ${accent}0a 0%, transparent 50%)
          `,
        }}
      />

      {/* Giant chapter number — full bleed behind everything */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden pr-4 pb-2 md:pr-8 md:pb-4">
        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: "clamp(22rem, 55vw, 48rem)",
            color: `${accent}09`,
            letterSpacing: "-0.08em",
            lineHeight: 0.8,
          }}
        >
          {String(chapter.index).padStart(2, "0")}
        </span>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-14 lg:px-20"
        style={reducedMotion ? { pointerEvents } : { y, pointerEvents }}
      >
        {/* Top label row */}
        <motion.div {...in_(0)} className="flex items-center gap-4 mb-10 md:mb-14">
          <span
            className="font-mono text-[11px] tracking-[0.3em] uppercase"
            style={{ color: `${accent}80` }}
          >
            CH {String(chapter.index).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: `${accent}30` }} />
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold"
            style={{ color: accent }}
          >
            {chapter.primitive}
          </span>
        </motion.div>

        {/* Two-zone layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center max-w-7xl">

          {/* LEFT ZONE — identity */}
          <div className="flex flex-col gap-5 md:gap-7">

            {/* Title — the biggest, boldest thing on screen */}
            <motion.h2
              {...in_(0.05)}
              className="font-display font-black tracking-tighter leading-[0.88] text-white"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
            >
              <ScrambleText text={chapter.title} isActive={isActive} delay={150} />
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              {...in_(0.1)}
              className="font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase"
              style={{ color: `${accent}70` }}
            >
              {chapter.subtitle}
            </motion.p>

            {/* The quote — large, commanding, with strong accent bar */}
            <motion.blockquote {...in_(0.17)} className="relative pl-5 md:pl-6 mt-2 md:mt-4">
              <div
                className="absolute left-0 top-1 bottom-1 w-[3px] md:w-[4px] rounded-full"
                style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}40)` }}
              />
              <p
                className="font-display font-semibold leading-[1.25]"
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 2.1rem)",
                  color: "rgba(246,244,239,0.95)",
                }}
              >
                &ldquo;{chapter.opening}&rdquo;
              </p>
            </motion.blockquote>

            {/* Anchor object — styled as a physical artifact tag */}
            {chapter.anchor && (
              <motion.div
                {...in_(0.23)}
                className="hidden lg:inline-flex items-center gap-3 mt-2 self-start"
              >
                <div
                  className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase border"
                  style={{
                    borderColor: `${accent}35`,
                    color: `${accent}cc`,
                    background: `${accent}0d`,
                  }}
                >
                  ◈ {chapter.anchor.object}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT ZONE — narrative */}
          <div className="flex flex-col justify-center gap-4 md:gap-5">
            {sentences.map((sentence, idx) => (
              <motion.p
                key={idx}
                {...in_(0.12 + idx * 0.07)}
                className="font-sans leading-[1.75]"
                style={{
                  fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                  color: idx === 0
                    ? "rgba(246,244,239,0.88)"
                    : "rgba(148,163,184,0.72)",
                  borderLeft: idx === 0 ? `2px solid ${accent}50` : "none",
                  paddingLeft: idx === 0 ? "1rem" : "0",
                }}
              >
                {/* Highlight numbers in accent color */}
                {sentence
                  .split(/(\d[\d,+]*\+?\s*(?:tests?|users?|hours?|downloads?|models?|%)?)/gi)
                  .map((part, pi) =>
                    /^\d/.test(part) ? (
                      <span key={pi} className="font-bold" style={{ color: accent }}>
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
              </motion.p>
            ))}

            {/* Visual signature line at the bottom */}
            <motion.div
              {...in_(0.12 + sentences.length * 0.07)}
              className="flex items-center gap-3 mt-4 pt-4"
              style={{ borderTop: `1px solid ${accent}15` }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
              />
              <span
                className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase"
                style={{ color: `${accent}50` }}
              >
                {chapter.visualEra}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
