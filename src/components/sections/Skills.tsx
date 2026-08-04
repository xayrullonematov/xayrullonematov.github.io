"use client";

import { skillGroups } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="capabilities" className="section container-wide relative border-t border-white/[0.08]">
      <h2 className="sr-only">Engineering Capabilities & Craft</h2>

      <div className="mb-12">
        <SectionHeading
          index="03"
          label="Capabilities"
          title="Engineering stack & design craft."
        />
      </div>

      <Stagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroups.map((group, i) => (
          <StaggerItem key={group.title}>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 h-full transition-all duration-300 hover:border-accent/40 hover:bg-surface-elevated flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="mono text-xs text-accent">0{i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/60 group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="display text-xl font-bold text-text mb-4 group-hover:text-accent transition-colors">
                  {group.title}
                </h3>

                <ul className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-muted group-hover:text-slate-200 transition-colors">
                      <span className="mono text-[10px] text-accent/80">›</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] mono text-muted-dim">
                <span>Domain 0{i + 1}</span>
                <span className="text-accent/60">Production Ready</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
