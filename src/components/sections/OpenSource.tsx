"use client";

import React from "react";
import { repositories } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GhostButton } from "@/components/ui/MagneticButton";

const RepoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
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

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export function OpenSource() {
  return (
    <section id="opensource" className="section border-y border-border bg-surface/40 relative">
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
      
      <div className="container relative z-10">
        <SectionHeading
          index="02"
          label="Open source"
          title="Building in public."
          description="Tools, experiments, and contributions to the developer ecosystem. Mostly TypeScript, Python, and Dart."
        />

        <div className="mt-16">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <StaggerItem key={repo.name} className="h-full">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full card-surface group hover:border-border-strong transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
                  data-cursor="hover"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2 text-muted group-hover:text-accent transition-colors">
                        <RepoIcon />
                        <h4 className="font-semibold text-text group-hover:text-accent transition-colors">
                          {repo.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-dim bg-surface-elevated px-2 py-1 rounded-md border border-border group-hover:border-border-strong transition-colors">
                        <StarIcon />
                        <span>{repo.stars}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-dim leading-relaxed flex-grow mb-6">
                      {repo.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border group-hover:border-border-strong transition-colors">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-sm"
                          style={{ backgroundColor: repo.languageColor }}
                          aria-hidden="true"
                        ></span>
                        <span className="text-xs font-mono text-muted-dim">
                          {repo.language}
                        </span>
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-muted group-hover:text-accent transition-colors flex items-center gap-1">
                        View
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-20 p-8 rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-elevated flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h4 className="text-xl font-display font-bold text-text mb-2">
                Follow the build in public
              </h4>
              <p className="text-muted">
                Explore more projects, gists, and experiments on my GitHub profile.
              </p>
            </div>
            <GhostButton
              href="https://github.com/xayrullonematov"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap"
            >
              <span className="flex items-center gap-2">
                View GitHub Profile
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </span>
            </GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
