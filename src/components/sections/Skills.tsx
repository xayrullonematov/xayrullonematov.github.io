import { skillGroups } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="section relative border-y border-white/5 bg-surface/30">
      <h2 className="sr-only">Skills</h2>
      <div className="container-wide">
        <SectionHeading 
          index="04" 
          label="Capabilities" 
          title="Tools & Technologies" 
        />
        
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {skillGroups.map((group, index) => (
            <StaggerItem key={index}>
              <div className="card-surface rounded-2xl border border-white/5 h-full overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
                  <span className="mono text-xs text-muted-dim">0{index + 1}</span>
                  <h3 className="font-display text-lg text-text">{group.title}</h3>
                </div>
                <ul className="flex-1 divide-y divide-white/5">
                  {group.skills.map((skill, i) => (
                    <li key={i} className="px-6 py-4 text-sm text-muted hover:text-text transition-colors">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
