/**
 * FROM STONE TO SYSTEMS — Future Horizon
 *
 * The final state of the exhibition. Intentionally unfinished.
 * The system extends beyond the visible. Clear next actions.
 */

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { futureActions, siteInfo } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";
import { ScrambleText } from "@/components/ui/ScrambleText";

const icons = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.5a6.5 6.5 0 0 0-1.7-4.5 5.9 5.9 0 0 0-.2-4.4s-1.4-.4-4.5 2.5a14 14 0 0 0-8 0C3.4 1.7 2 2.1 2 2.1a5.9 5.9 0 0 0-.2 4.4A6.5 6.5 0 0 0 0 10.5c0 7 3 8.2 6 8.5a4.8 4.8 0 0 0-1 3.2v4" />
      <path d="M9 18c-4.5 1.6-5-2-7-2" />
    </svg>
  ),
  terminal: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  message: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

// Reusable fade-up driven by isActive so it replays on re-entry
function FadeUp({
  children,
  isActive,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  isActive: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FutureHorizon() {
  const { state, reducedMotion } = useExhibition();
  const { scrollYProgress } = useScroll();

  // Future is chapter 7 (index 7 of 8)
  const start = 7 / 8; // 0.875
  const fade = 0.04;

  const opacity = useTransform(scrollYProgress, [start, start + fade], [0, 1]);
  const y = useTransform(scrollYProgress, [start, start + fade], [40, 0]);
  const visibility = useTransform(scrollYProgress, (p) =>
    p >= start - fade ? "visible" : "hidden"
  );

  const isActive = state.activeChapterIndex === 7;
  const pointerEvents = isActive ? "auto" : "none";

  return (
    <motion.section
      id="future"
      className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none"
      aria-labelledby="future-title"
      style={
        reducedMotion
          ? { opacity: isActive ? 1 : 0, pointerEvents, visibility: isActive ? "visible" : "hidden" }
          : { opacity, y, pointerEvents, visibility }
      }
      aria-hidden={!isActive}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(246,244,239,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-8 overflow-y-auto pb-20 md:pb-0"
        style={{ maxHeight: "100dvh", scrollbarWidth: "none" }}
      >
        <div className="flex flex-col text-center gap-6 md:gap-10 pt-16 md:pt-0">

          {/* Chapter marker */}
          <FadeUp isActive={isActive} delay={0}>
            <span
              className="inline-block font-mono text-xs tracking-widest uppercase"
              style={{ color: "rgba(246,244,239,0.35)" }}
            >
              07 — Future
            </span>
          </FadeUp>

          {/* Opening quote */}
          <FadeUp isActive={isActive} delay={0.08}>
            <p
              className="text-lg md:text-2xl italic max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(246,244,239,0.6)", fontFamily: "var(--font-display)" }}
            >
              &ldquo;The most honest thing a builder can say is: I am not done yet.&rdquo;
            </p>
          </FadeUp>

          {/* Title */}
          <FadeUp isActive={isActive} delay={0.16}>
            <h2
              id="future-title"
              className="font-semibold leading-[0.95] tracking-[-0.04em] text-balance"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
                fontFamily: "var(--font-display), var(--font-sans), system-ui, sans-serif",
                color: "#f6f4ef",
              }}
            >
              <ScrambleText text="The system is" isActive={isActive} delay={300} />
              <br />
              <span style={{ color: "rgba(246,244,239,0.3)" }}>
                <ScrambleText text="intentionally" isActive={isActive} delay={700} />
              </span>
              <br />
              <ScrambleText text="unfinished." isActive={isActive} delay={1100} />
            </h2>
          </FadeUp>

          {/* Narrative */}
          <FadeUp isActive={isActive} delay={0.24} className="max-w-2xl mx-auto space-y-3 text-left px-2 md:px-0">
            {"From Stone Age to Cyber Punk is not a tagline — it is a trajectory. The countryside curiosity, the cracked phone screen, the slow laptop, the first shipped product, the open-source conviction, the AI-augmented engineering — they are all one continuous thread. The future is the next question that cannot yet be named."
              .split(/(?<=\.)\s+/)
              .map((sentence, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "rgba(148,163,184,0.85)" }}
                >
                  {sentence}
                </p>
              ))}
          </FadeUp>

          {/* Divider */}
          <FadeUp isActive={isActive} delay={0.3}>
            <div
              className="h-px w-24 mx-auto"
              style={{ background: "rgba(246,244,239,0.15)" }}
              aria-hidden
            />
          </FadeUp>
        </div>

        {/* Next Actions */}
        <FadeUp isActive={isActive} delay={0.36} className="mt-10 md:mt-12">
          <p
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6 text-center"
            style={{ color: "rgba(246,244,239,0.3)" }}
          >
            Continue the thread →
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {futureActions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-3 p-4 rounded-xl border transition-colors duration-300"
                style={{
                  background: "rgba(15,18,28,0.6)",
                  borderColor: "rgba(246,244,239,0.07)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(246,244,239,0.18)";
                  e.currentTarget.style.background = "rgba(25,30,45,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(246,244,239,0.07)";
                  e.currentTarget.style.background = "rgba(15,18,28,0.6)";
                }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(246,244,239,0.05)", color: "rgba(246,244,239,0.45)" }}
                >
                  {icons[action.icon]}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium mb-0.5 group-hover:text-white transition-colors duration-200" style={{ color: "rgba(246,244,239,0.88)" }}>
                    {action.label}
                    <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </p>
                  <p className="text-xs" style={{ color: "rgba(148,163,184,0.55)" }}>
                    {action.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </FadeUp>

        {/* Identity footer */}
        <FadeUp isActive={isActive} delay={0.55} className="mt-12 pt-6 text-center" >
          <div style={{ borderTop: "1px solid rgba(246,244,239,0.06)" }} className="pt-6">
            <p className="text-sm font-medium mb-1" style={{ color: "rgba(246,244,239,0.65)", fontFamily: "var(--font-display)" }}>
              {siteInfo.name}
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(148,163,184,0.35)" }}>
              {siteInfo.location}
            </p>
            <p className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "rgba(148,163,184,0.2)" }}>
              {siteInfo.tagline}
            </p>
          </div>
        </FadeUp>
      </div>
    </motion.section>
  );
}
