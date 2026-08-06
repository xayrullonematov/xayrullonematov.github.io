"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { type Chapter, chapters } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";
import { CurtainReveal } from "@/components/ui/CurtainReveal";
import { WordReveal } from "@/components/ui/WordReveal";

// Per-chapter image — right side of screen, subtle, adds visual texture
const CHAPTER_IMAGES: Record<string, string> = {
  curiosity:   "/images/generated/curiosity-electronics.jpg",
  survival:    "/images/generated/survival-phone.jpg",
  discovery:   "/images/generated/discovery-laptop.jpg",
  building:    "/images/generated/building-forge.jpg",
  opensource:  "/images/generated/opensource-network.jpg",
  ai:          "/images/generated/ai-circuit.jpg",
};

export function ChapterSection({ chapter, hasMilestone = false }: { chapter: Chapter; hasMilestone?: boolean }) {
  const { reducedMotion, state } = useExhibition();
  const { scrollYProgress } = useScroll();

  const TOTAL = 8;
  const start = chapter.index / TOTAL;
  const end = (chapter.index + 1) / TOTAL;

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
  const visibility = useTransform(
    scrollYProgress,
    (p) => (p >= start - fade && p <= fadeOutPoint + fade) ? "visible" : "hidden"
  );

  const prevWeight = chapters[chapter.index - 1]?.fontWeight ?? chapter.fontWeight;
  const titleWeight: MotionValue<number> = useTransform(
    scrollYProgress,
    [start, end],
    [prevWeight, chapter.fontWeight]
  );

  const isActive = state.progress >= start - fade && state.progress <= fadeOutPoint + fade;
  const pointerEvents = isActive ? "auto" : "none";
  const accent = chapter.palette.primary;
  const chapterImage = CHAPTER_IMAGES[chapter.id];
  const sentences = chapter.narrative.split(/(?<=\.)\s+/).filter(Boolean);

  return (
    <motion.section
      id={`chapter-${chapter.index}`}
      className="absolute inset-0 pointer-events-none overflow-hidden"
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
      {/* Chapter image — right half, fades in with chapter, masked at left edge */}
      {chapterImage && (
        <motion.div
          className="absolute inset-y-0 right-0 w-[55%] pointer-events-none hidden md:block"
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${chapterImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.28,
              mixBlendMode: "luminosity",
            }}
          />
          {/* Gradient mask — fades image out toward the left where text is */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)",
            }}
          />
          {/* Accent color overlay — ties image to chapter palette */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${accent}12 100%)`,
            }}
          />
        </motion.div>
      )}

      {/* Vignette behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 90% at 15% 50%, rgba(0,0,0,0.75) 0%, transparent 100%)`,
        }}
      />

      {/* Chapter number watermark — bottom right */}
      <div
        className="absolute bottom-0 right-0 leading-none select-none pointer-events-none overflow-hidden"
        style={{
          fontFamily: "var(--font-display)",
          fontVariationSettings: "'wght' 900",
          fontSize: "15vw",
          color: accent,
          opacity: 0.06,
          letterSpacing: "-0.06em",
          lineHeight: 0.85,
          paddingRight: "2vw",
        }}
        aria-hidden
      >
        {String(chapter.index).padStart(2, "0")}
      </div>

      {/* Main content block */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center"
        style={reducedMotion ? { pointerEvents } : { y, pointerEvents }}
      >
        <div className="px-[6vw] max-w-3xl">

          {/* Top label row */}
          <motion.div
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: `${accent}80` }}>
              CH {String(chapter.index).padStart(2, "0")}
            </span>
            <div className="h-px w-8" style={{ background: `${accent}30` }} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: accent }}>
              {chapter.primitive}
            </span>
          </motion.div>

          {/* Title — curtain wipe */}
          <div className="mb-6 md:mb-8">
            <CurtainReveal isActive={isActive} delay={0.05} duration={0.8}>
              <h2
                className="leading-[0.88] tracking-[-0.04em]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.5rem, 10vw, 8rem)",
                  color: "#f0ece4",
                }}
              >
                <MotionTitle titleWeight={titleWeight}>{chapter.title}</MotionTitle>
              </h2>
            </CurtainReveal>
          </div>

          {/* Subtitle */}
          <motion.p
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8 md:mb-10"
            style={{ color: `${accent}60` }}
          >
            {chapter.subtitle}
          </motion.p>

          {/* Quote — word-by-word in accent color */}
          <div className="mb-8 md:mb-10 max-w-2xl">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontVariationSettings: "'wght' 400",
                fontSize: "clamp(1.3rem, 3vw, 2.1rem)",
                lineHeight: 1.25,
                color: accent,
                display: "block",
              }}
            >
              <WordReveal text={`"${chapter.opening}"`} isActive={isActive} delay={0.3} stagger={0.04} />
            </span>
          </div>

          {/* Narrative */}
          <div className="max-w-xl flex flex-col gap-3">
            {sentences.map((sentence, idx) => (
              <motion.p
                key={idx}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="font-sans leading-relaxed"
                style={{
                  fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                  color: idx === 0 ? "rgba(240,236,228,0.85)" : "rgba(148,163,184,0.7)",
                  borderLeft: idx === 0 ? `2px solid ${accent}50` : "none",
                  paddingLeft: idx === 0 ? "0.85rem" : "0",
                }}
              >
                {sentence
                  .split(/(\d[\d,]*\+?\s*(?:tests?|users?|hours?|downloads?|models?|%)?)/gi)
                  .map((part, pi) =>
                    /^\d/.test(part)
                      ? <span key={pi} style={{ color: accent, fontWeight: 700 }}>{part}</span>
                      : part
                  )}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function MotionTitle({ children, titleWeight }: { children: React.ReactNode; titleWeight: MotionValue<number> }) {
  return (
    <motion.span
      style={{
        fontVariationSettings: useTransform(titleWeight, (w) => `'wght' ${Math.round(w)}`),
        display: "block",
      }}
    >
      {children}
    </motion.span>
  );
}
