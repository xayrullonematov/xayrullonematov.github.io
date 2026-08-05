/**
 * FROM STONE TO SYSTEMS — Future Horizon
 * 
 * The final state of the exhibition. Intentionally unfinished.
 * The system extends beyond the visible. Clear next actions.
 */

"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { futureActions, siteInfo } from "@/data/journey";
import { useExhibition } from "@/lib/ExhibitionContext";

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

export function FutureHorizon() {
  const { state, reducedMotion } = useExhibition();

  // Use the window scroll to drive the timeline
  const { scrollYProgress } = useScroll();

  // Future is chapter 7
  const start = 7 / 8; // 0.875
  const fade = 0.05;

  const opacity = useTransform(scrollYProgress, [start, start + fade], [0, 1]);
  const y = useTransform(scrollYProgress, [start, start + fade], [50, 0]);
  
  const isActive = state.activeChapterIndex === 7;
  const pointerEvents = isActive ? "auto" : "none";
  const visibility = useTransform(scrollYProgress, (p) => p >= start - fade ? "visible" : "hidden");

  return (
    <motion.section
      id="future"
      className="absolute inset-0 flex flex-col justify-center py-24 md:py-32 overflow-hidden pointer-events-none"
      aria-labelledby="future-title"
      style={reducedMotion ? { opacity: isActive ? 1 : 0, pointerEvents, visibility: isActive ? "visible" : "hidden" } : { opacity, pointerEvents, visibility }}
      aria-hidden={!isActive}
    >
      {/* Ambient glow — the open edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(246, 244, 239, 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-8 max-h-[100dvh] overflow-y-auto no-scrollbar pb-24 md:pb-0">
        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4 md:mb-8"
        >
          <span
            className="inline-block font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(246, 244, 239, 0.4)" }}
          >
            07 — Future
          </span>
        </motion.div>

        {/* Opening */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl italic mb-12"
          style={{ color: "rgba(246, 244, 239, 0.6)", fontFamily: "var(--font-display)" }}
        >
          &ldquo;The most honest thing a builder can say is: I am not done yet.&rdquo;
        </motion.p>

        {/* Title */}
        <motion.h2
          id="future-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] mb-8"
          style={{ fontFamily: "var(--font-display), var(--font-sans), system-ui, sans-serif", color: "#f6f4ef" }}
        >
          The system is
          <br />
          <span style={{ color: "rgba(246, 244, 239, 0.3)" }}>intentionally</span>
          <br />
          unfinished.
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-2xl text-base md:text-lg leading-relaxed mb-16"
          style={{ color: "rgba(148, 163, 184, 0.9)" }}
        >
          From Stone Age to Cyber Punk is not a tagline — it is a trajectory.
          The countryside curiosity, the cracked phone screen, the slow laptop,
          the first shipped product, the open-source conviction, the AI-augmented
          engineering — they are all one continuous thread. The future is the next
          question that cannot yet be named.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isActive ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-px w-full mb-16 origin-left"
          style={{ background: "rgba(246, 244, 239, 0.1)" }}
          aria-hidden
        />

        {/* Next Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3
            className="font-mono text-[11px] tracking-[0.2em] uppercase mb-8"
            style={{ color: "rgba(246, 244, 239, 0.3)" }}
          >
            Continue the thread →
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {futureActions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.55 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300"
                style={{
                  background: "rgba(19, 23, 34, 0.5)",
                  borderColor: "rgba(246, 244, 239, 0.06)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(246, 244, 239, 0.15)";
                  e.currentTarget.style.background = "rgba(19, 23, 34, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(246, 244, 239, 0.06)";
                  e.currentTarget.style.background = "rgba(19, 23, 34, 0.5)";
                }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: "rgba(246, 244, 239, 0.04)",
                    color: "rgba(246, 244, 239, 0.5)",
                  }}
                >
                  {icons[action.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium mb-1 transition-colors duration-300 group-hover:text-white"
                    style={{ color: "rgba(246, 244, 239, 0.9)" }}
                  >
                    {action.label}
                    <span className="inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(148, 163, 184, 0.6)" }}
                  >
                    {action.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Identity footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(246, 244, 239, 0.05)" }}
        >
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "rgba(246, 244, 239, 0.7)", fontFamily: "var(--font-display)" }}
          >
            {siteInfo.name}
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4"
            style={{ color: "rgba(148, 163, 184, 0.4)" }}
          >
            {siteInfo.location}
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.1em]"
            style={{ color: "rgba(148, 163, 184, 0.25)" }}
          >
            {siteInfo.tagline}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
