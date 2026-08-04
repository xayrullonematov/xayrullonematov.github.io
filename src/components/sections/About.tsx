"use client";

import { about, site } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section container-wide relative">
      <h2 className="sr-only">About {site.name}</h2>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Studio Badge */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <SectionHeading
            index="03"
            label="About"
            title="Engineer. Founder. Continuous builder."
          />

          {/* Hamma Labs Brand Card with PNG logo */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <img
                  src="/images/logo.png"
                  alt="Hamma Labs Official Logo"
                  className="h-14 w-14 rounded-xl object-contain border border-white/10 p-1 shadow-lg bg-[#0a0d13]"
                />
                <div>
                  <h3 className="display text-xl font-semibold text-text">Hamma Labs</h3>
                  <p className="mono text-xs text-accent">Local-first AI Systems Studio</p>
                  <p className="mono text-[11px] text-muted mt-0.5">Founded by {site.name}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Bio Paragraphs, Facts, & Quote */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6 text-base md:text-lg text-muted leading-relaxed">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 gap-4 pt-4 sm:gap-6">
              {about.facts.map((fact, i) => (
                <div
                  key={i}
                  className="card-surface p-5 md:p-6 rounded-2xl border border-white/10 flex flex-col justify-center"
                >
                  <span className="text-xs text-muted uppercase tracking-wider mb-1.5 mono">
                    {fact.label}
                  </span>
                  <span className="text-text font-medium text-base md:text-lg">{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="relative p-8 rounded-3xl border border-white/10 bg-surface overflow-hidden mt-8">
              <div
                className="gradient-orb top-0 right-0 h-48 w-48 opacity-20"
                style={{ background: "var(--accent)" }}
                aria-hidden
              />
              <blockquote className="relative z-10 text-lg md:text-xl font-display text-text leading-relaxed">
                &ldquo;The most resilient systems don&apos;t just survive failures &mdash; they log the entire event chain and let you debug exactly where reality diverged from the plan.&rdquo;
              </blockquote>
              <div className="relative z-10 mt-6 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white/20" />
                <span className="mono text-xs text-accent tracking-wider uppercase">
                  HammaDev Design Principle
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
