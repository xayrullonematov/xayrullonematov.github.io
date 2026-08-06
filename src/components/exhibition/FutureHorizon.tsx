"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { futureActions, siteInfo } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";
import { CurtainReveal } from "@/components/ui/CurtainReveal";

const icons = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.5a6.5 6.5 0 0 0-1.7-4.5 5.9 5.9 0 0 0-.2-4.4s-1.4-.4-4.5 2.5a14 14 0 0 0-8 0C3.4 1.7 2 2.1 2 2.1a5.9 5.9 0 0 0-.2 4.4A6.5 6.5 0 0 0 0 10.5c0 7 3 8.2 6 8.5a4.8 4.8 0 0 0-1 3.2v4" />
      <path d="M9 18c-4.5 1.6-5-2-7-2" />
    </svg>
  ),
  terminal: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  message: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

function FadeUp({ children, isActive, delay = 0, className = "" }: { children: React.ReactNode; isActive: boolean; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FutureHorizon() {
  const { state, reducedMotion } = useExhibition();
  const { scrollYProgress } = useScroll();

  const start = 7 / 8;
  const fade = 0.04;
  const opacity = useTransform(scrollYProgress, [start, start + fade], [0, 1]);
  const y = useTransform(scrollYProgress, [start, start + fade], [40, 0]);
  const visibility = useTransform(scrollYProgress, (p) => (p >= start - fade ? "visible" : "hidden"));

  const isActive = state.activeChapterIndex === 7;
  const pointerEvents = isActive ? "auto" : "none";
  const accent = "#e8e4dc";

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
      {/* Subtle top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% -5%, rgba(232,228,220,0.04) 0%, transparent 60%)" }}
      />

      <div
        className="relative z-10 w-full max-w-4xl mx-auto px-[6vw] overflow-y-auto pb-16 md:pb-0"
        style={{ maxHeight: "100dvh", scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-7 md:gap-10 pt-16 md:pt-0">

          {/* Chapter marker */}
          <FadeUp isActive={isActive} delay={0}>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(232,228,220,0.35)" }}>
              07 — Future
            </span>
          </FadeUp>

          {/* Opening quote */}
          <FadeUp isActive={isActive} delay={0.07}>
            <p
              className="text-base md:text-xl italic leading-relaxed max-w-lg"
              style={{ fontFamily: "var(--font-display)", fontVariationSettings: "'wght' 300", color: "rgba(232,228,220,0.55)" }}
            >
              &ldquo;The most honest thing a builder can say is: I am not done yet.&rdquo;
            </p>
          </FadeUp>

          {/* Title — weight 900, systems era */}
          <FadeUp isActive={isActive} delay={0.14}>
            <div id="future-title">
              <CurtainReveal isActive={isActive} delay={0.18} duration={0.8}>
                <h2
                  className="leading-[0.88] tracking-[-0.04em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontVariationSettings: "'wght' 900",
                    fontSize: "clamp(3rem, 8vw, 6.5rem)",
                    color: "#f0ece4",
                  }}
                >
                  The system is<br />
                  <span style={{ color: "rgba(232,228,220,0.25)" }}>intentionally</span><br />
                  unfinished.
                </h2>
              </CurtainReveal>
            </div>
          </FadeUp>

          {/* Narrative */}
          <FadeUp isActive={isActive} delay={0.22} className="max-w-2xl">
            {"From Stone Age to Cyber Punk is not a tagline — it is a trajectory. The countryside curiosity, the cracked phone screen, the slow laptop, the first shipped product, the open-source conviction, the AI-augmented engineering — they are all one continuous thread. The future is the next question that cannot yet be named."
              .split(/(?<=\.)\s+/)
              .map((s, i) => (
                <p key={i} className="font-sans text-sm md:text-base leading-relaxed mb-3 last:mb-0" style={{ color: "rgba(148,163,184,0.8)" }}>
                  {s}
                </p>
              ))}
          </FadeUp>

          <FadeUp isActive={isActive} delay={0.28}>
            <div className="h-px w-16" style={{ background: "rgba(232,228,220,0.12)" }} />
          </FadeUp>
        </div>

        {/* Action cards — no backdrop-blur */}
        <FadeUp isActive={isActive} delay={0.34} className="mt-10 md:mt-12">
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-5" style={{ color: "rgba(232,228,220,0.28)" }}>
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
                transition={{ duration: 0.45, delay: 0.38 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-3 p-4 rounded-lg border transition-colors duration-250"
                style={{
                  background: "rgba(8,9,15,0.75)",
                  borderColor: "rgba(232,228,220,0.08)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,228,220,0.2)"; e.currentTarget.style.background = "rgba(15,16,22,0.85)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,228,220,0.08)"; e.currentTarget.style.background = "rgba(8,9,15,0.75)"; }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "rgba(232,228,220,0.05)", color: "rgba(232,228,220,0.4)" }}>
                  {icons[action.icon]}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium mb-0.5 group-hover:text-white transition-colors" style={{ color: "rgba(232,228,220,0.85)" }}>
                    {action.label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                  <p className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{action.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </FadeUp>

        {/* Identity footer */}
        <FadeUp isActive={isActive} delay={0.52} className="mt-10 pt-6" >
          <div style={{ borderTop: "1px solid rgba(232,228,220,0.06)" }} className="pt-5 text-center">
            <p className="text-sm font-medium mb-1" style={{ fontFamily: "var(--font-display)", fontVariationSettings: "'wght' 500", color: "rgba(232,228,220,0.6)" }}>
              {siteInfo.name}
            </p>
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase mb-2" style={{ color: "rgba(148,163,184,0.3)" }}>
              {siteInfo.location}
            </p>
            <p className="font-mono text-[9px] tracking-[0.12em]" style={{ color: "rgba(148,163,184,0.18)" }}>
              {siteInfo.tagline}
            </p>
          </div>
        </FadeUp>
      </div>
    </motion.section>
  );
}
