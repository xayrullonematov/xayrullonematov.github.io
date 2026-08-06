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

  // Chapter text fades out at 0.40 so milestone cards (starting at 0.50) never overlap
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
    [40, 0, 0, -40]
  );

  const isActive = state.progress >= start - fade && state.progress <= fadeOutPoint + fade;
  const pointerEvents = isActive ? "auto" : "none";
  const visibility = useTransform(
    scrollYProgress,
    (p) => (p >= start - fade && p <= fadeOutPoint + fade) ? "visible" : "hidden"
  );

  // Stagger config — shorter delays, no blur filter (too expensive mid-scroll)
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const accent = chapter.palette.primary;

  return (
    <motion.section
      id={`chapter-${chapter.index}`}
      className="absolute inset-0 flex flex-col justify-center px-5 md:px-12 lg:px-20 pt-16 pb-10 pointer-events-none overflow-hidden"
      style={
        reducedMotion
          ? { opacity: state.activeChapterIndex === chapter.index ? 1 : 0, visibility: state.activeChapterIndex === chapter.index ? "visible" : "hidden" }
          : { opacity, visibility }
      }
      aria-hidden={!isActive}
    >
      {/* Ambient chapter glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${chapter.palette.glow} 0%, transparent 70%)` }}
      />

      {/* Giant watermark number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-bold leading-none"
          style={{
            fontSize: "clamp(18rem, 45vw, 38rem)",
            color: "rgba(246,244,239,0.018)",
            letterSpacing: "-0.06em",
          }}
        >
          {String(chapter.index).padStart(2, "0")}
        </span>
      </div>

      {/* Content — two-column on desktop, single on mobile */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        style={reducedMotion ? { pointerEvents } : { y, pointerEvents }}
      >
        {/* Chapter badge */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-white/30 uppercase">
            CH {String(chapter.index).padStart(2, "0")}
          </span>
          <div className="h-px w-8 bg-white/15" />
          <span
            className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold"
            style={{ color: accent }}
          >
            {chapter.primitive}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT — Title + Quote */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Title */}
            <motion.h2
              {...fadeUp(0.05)}
              className="font-display font-bold tracking-tighter text-white leading-[0.95]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
            >
              <ScrambleText text={chapter.title} isActive={isActive} delay={200} />
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.1)}
              className="font-sans text-base md:text-lg tracking-wide"
              style={{ color: "rgba(148,163,184,0.7)" }}
            >
              {chapter.subtitle}
            </motion.p>

            {/* THE QUOTE — hero element, full width, big, accented */}
            <motion.blockquote
              {...fadeUp(0.15)}
              className="relative mt-2"
            >
              {/* Accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ background: accent }}
              />
              <p
                className="pl-5 font-display font-medium leading-snug"
                style={{
                  fontSize: "clamp(1.15rem, 2.8vw, 1.75rem)",
                  color: "rgba(246,244,239,0.92)",
                }}
              >
                &ldquo;{chapter.opening}&rdquo;
              </p>
            </motion.blockquote>

            {/* Anchor object — desktop only */}
            {chapter.anchor && (
              <motion.div
                {...fadeUp(0.2)}
                className="hidden lg:flex items-start gap-4 mt-2 p-4 rounded-xl border"
                style={{
                  borderColor: `${accent}25`,
                  background: `${accent}08`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: accent }}
                />
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: `${accent}90` }}>
                    Anchor
                  </p>
                  <p className="text-sm font-medium text-white/80 mb-0.5">{chapter.anchor.object}</p>
                  <p className="text-xs text-white/40 italic">{chapter.anchor.meaning}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — Narrative sentences */}
          <div className="flex flex-col gap-4 md:gap-5 lg:pt-2">
            {chapter.narrative.split(/(?<=\.)\s+/).map((sentence, idx) => (
              <motion.p
                key={idx}
                {...fadeUp(0.1 + idx * 0.08)}
                className="font-sans leading-relaxed"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                  // First sentence is brighter to pull the eye in
                  color: idx === 0
                    ? "rgba(246,244,239,0.85)"
                    : "rgba(148,163,184,0.75)",
                }}
              >
                {/* Highlight stat-like fragments in accent color */}
                {sentence.split(/(\d[\d,+]+\+?\s*(?:tests?|users?|hours?|downloads?|models?|%)?)/gi).map((part, pi) =>
                  /^\d/.test(part) ? (
                    <span key={pi} className="font-semibold" style={{ color: accent }}>
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
