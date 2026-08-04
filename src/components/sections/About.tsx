"use client";

import { manifesto, site } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="manifesto" className="section container-wide relative">
      <h2 className="sr-only">Hamma Labs Manifesto</h2>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Studio Badge */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <SectionHeading
            index="02"
            label="Manifesto"
            title="Software built with craft and conviction."
          />

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-5 shadow-xl glass-panel">
              <div className="flex items-center gap-3.5">
                <img
                  src="/images/logo.png"
                  alt="Hamma Labs Official Logo"
                  className="h-12 w-12 rounded-xl object-contain border border-white/10 p-1 shadow-lg bg-[#0e131d]"
                />
                <div>
                  <h3 className="display text-lg font-semibold text-text">Hamma Labs</h3>
                  <p className="mono text-xs text-accent">Local-First AI Systems Studio</p>
                  <p className="mono text-[11px] text-muted mt-0.5">{site.location}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 3 Manifesto Principle Cards */}
        <div className="lg:col-span-8">
          <Stagger stagger={0.12} className="grid grid-cols-1 gap-6">
            {manifesto.map((item) => (
              <StaggerItem key={item.number}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 md:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-surface-elevated">
                  {/* Accent glow on hover */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <span className="mono text-xs font-semibold text-accent tracking-widest uppercase">
                      Principle {item.number}
                    </span>
                    <span className="mono text-[10px] text-muted-dim">HAMMA LABS</span>
                  </div>

                  <h3 className="display text-xl md:text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-base text-muted leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Principle Quote Box */}
          <Reveal delay={0.4}>
            <div className="relative p-8 rounded-2xl border border-white/10 glass-panel overflow-hidden mt-8">
              <div
                className="gradient-orb top-0 right-0 h-48 w-48 opacity-15"
                style={{ background: "var(--accent-purple)" }}
                aria-hidden
              />
              <blockquote className="relative z-10 text-lg md:text-xl font-display text-text leading-relaxed">
                &ldquo;The most resilient systems don&apos;t just survive failures &mdash; they log the entire event chain and let you debug exactly where reality diverged from the plan.&rdquo;
              </blockquote>
              <div className="relative z-10 mt-6 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-accent/40" />
                <span className="mono text-xs text-accent tracking-wider uppercase">
                  HammaDev Execution Contract
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
