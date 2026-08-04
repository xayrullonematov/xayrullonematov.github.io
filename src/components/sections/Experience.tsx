import { experience } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="section container-wide relative">
      <h2 className="sr-only">Experience</h2>
      
      <SectionHeading 
        index="05" 
        label="Experience & Hackathons" 
        title="Where I've built" 
      />

      <div className="mt-20 max-w-5xl mx-auto">
        <Stagger className="space-y-12 pl-4 md:pl-0 border-l md:border-none border-white/10 ml-2 md:ml-0">
          {experience.map((item, index) => (
            <StaggerItem key={index}>
              <div className="relative md:grid md:grid-cols-[200px_1fr] md:gap-12 group">
                {/* Timeline dot */}
                <div className="absolute -left-[21px] md:left-auto md:right-[calc(100%+24px)] top-1 w-2.5 h-2.5 rounded-full bg-surface border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_var(--accent)] transition-all duration-300 md:hidden"></div>
                
                {/* Year - Hidden on mobile in layout, shown above title */}
                <div className="hidden md:flex flex-col items-end pr-12 border-r border-white/10 relative">
                  <div className="absolute -right-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-surface border-2 border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_var(--accent)] transition-all duration-300"></div>
                  <span className="mono text-[var(--accent)] text-lg">{item.year}</span>
                </div>

                {/* Content */}
                <div className="pb-12 md:pb-16 pl-6 md:pl-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="md:hidden mono text-[var(--accent)] text-sm block mb-2">{item.year}</span>
                      <h3 className="text-2xl font-display text-text">{item.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs mono text-muted bg-white/5 rounded-full border border-white/10 whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted leading-relaxed max-w-2xl text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
