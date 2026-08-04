"use client";

import { site } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { AccentButton, GhostButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return (
    <section
      id="contact"
      className="section relative overflow-hidden pb-28 md:pb-36"
      aria-labelledby="contact-title"
    >
      {/* Ambient gradient */}
      <div
        className="gradient-orb top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />

      <div className="container relative z-10">
        <Reveal>
          <p className="mono mb-6 text-center text-[11px] tracking-[0.2em] text-muted uppercase">
            06 — Contact
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="contact-title"
            className="display mx-auto max-w-4xl text-center text-[clamp(2.5rem,8vw,5.5rem)] text-balance"
          >
            Let&apos;s build something that lasts
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-lg text-center text-base text-muted md:text-lg">
            Open to collaborations, open-source partnerships, and ambitious AI
            product work. Prefer email — no forms, no friction.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <AccentButton href={`mailto:${site.email}`} className="!px-8 !py-4 !text-base">
              {site.email}
            </AccentButton>
            <GhostButton
              href={site.github}
              target="_blank"
              className="!px-8 !py-4 !text-base"
            >
              GitHub
            </GhostButton>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-14 text-center mono text-xs tracking-wide text-muted-dim">
            {site.location} · {site.bio}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
