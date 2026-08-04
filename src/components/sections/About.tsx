import { about } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="section container-wide relative">
      <h2 className="sr-only">About</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <div className="lg:col-span-5 sticky top-24">
          <SectionHeading 
            index="03" 
            label="About" 
            title="Engineer. Founder. Continuous builder." 
          />
        </div>
        
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6 text-lg text-muted">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 gap-4">
              {about.facts.map((fact, i) => (
                <div key={i} className="card-surface p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                  <span className="text-xs text-muted-dim uppercase tracking-wider mb-2 mono">{fact.label}</span>
                  <span className="text-text font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="relative p-8 rounded-2xl border border-white/5 bg-surface-elevated overflow-hidden mt-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <blockquote className="relative z-10 text-xl font-display text-text leading-relaxed">
                &ldquo;The most resilient systems don&apos;t just survive failures &mdash; they log the entire event chain and let you debug exactly where reality diverged from the plan.&rdquo;
              </blockquote>
              <div className="relative z-10 mt-6 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white/20"></div>
                <span className="mono text-xs text-muted tracking-wider uppercase">HammaDev Design Principle</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
