"use client";

import React from "react";
import { projects } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { AccentButton, GhostButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const ExternalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.5a6.5 6.5 0 0 0-1.7-4.5 5.9 5.9 0 0 0-.2-4.4s-1.4-.4-4.5 2.5a14 14 0 0 0-8 0C3.4 1.7 2 2.1 2 2.1a5.9 5.9 0 0 0-.2 4.4A6.5 6.5 0 0 0 0 10.5c0 7 3 8.2 6 8.5a4.8 4.8 0 0 0-1 3.2v4" />
    <path d="M9 18c-4.5 1.6-5-2-7-2" />
  </svg>
);

export function Projects() {
  return (
    <section id="projects" className="section container">
      <SectionHeading
        index="01"
        label="Featured work"
        title="Proof of work."
        description="A selection of recent projects exploring AI memory, zero-trust infrastructure, and multi-agent systems."
      />

      <div className="mt-20 flex flex-col gap-32">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={project.id}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
              aria-labelledby={`project-title-${project.id}`}
            >
              <div
                className={cn(
                  "lg:col-span-7",
                  isEven ? "lg:order-1" : "lg:order-2"
                )}
              >
                <Reveal>
                  <ProjectVisual
                    type={project.visual}
                    accent={project.accent}
                    className="w-full aspect-video rounded-3xl"
                  />
                </Reveal>
              </div>

              <div
                className={cn(
                  "lg:col-span-5 flex flex-col items-start",
                  isEven ? "lg:order-2" : "lg:order-1"
                )}
              >
                <Reveal delay={0.1}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="mono text-muted text-sm border border-border px-3 py-1 rounded-full bg-surface-elevated">
                      {project.number}
                    </span>
                    <span
                      className="mono text-xs font-semibold uppercase tracking-wider"
                      style={{ color: project.accent }}
                    >
                      {project.tagline}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <h3
                    id={`project-title-${project.id}`}
                    className="display text-4xl lg:text-5xl font-bold text-text mb-6"
                  >
                    {project.name}
                  </h3>
                </Reveal>

                <Reveal delay={0.3}>
                  <p className="text-muted text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                </Reveal>

                <Reveal delay={0.4}>
                  <ul className="flex flex-col gap-3 mb-8">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-dim">
                        <svg
                          className="mt-1 flex-shrink-0"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={project.accent}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-muted-dim bg-surface-elevated px-3 py-1.5 rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.6}>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.demo && (
                      <AccentButton
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          Live Demo <ExternalIcon />
                        </span>
                      </AccentButton>
                    )}
                    {project.github && (
                      <GhostButton
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center gap-2">
                          Source Code <GithubIcon />
                        </span>
                      </GhostButton>
                    )}
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-32">
        <Reveal>
          <div className="mb-12">
            <h4 className="display text-2xl font-bold text-text mb-4">Architecture & Deep Dives</h4>
            <p className="text-muted">A closer look at the technical decisions behind these projects.</p>
          </div>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <div className="card-surface h-full flex flex-col group hover:border-border-strong transition-colors duration-300">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-6 bg-surface-elevated border border-border transition-colors duration-300 group-hover:border-border-strong"
                  style={{ color: project.accent }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <h5 className="font-bold text-text mb-3 flex items-center justify-between">
                  {project.name}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </h5>
                <p className="text-sm text-muted-dim leading-relaxed flex-grow">
                  {project.longDescription}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
