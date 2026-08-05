/**
 * FROM STONE TO SYSTEMS — Exhibition Orchestrator
 * 
 * This is the main client component that assembles the entire
 * immersive exhibition experience. It wraps everything in the
 * ExhibitionProvider and renders the continuous journey.
 */

"use client";

import { ExhibitionProvider } from "@/lib/ExhibitionContext";
import { Prologue } from "@/components/exhibition/Prologue";
import { ChapterSection } from "@/components/exhibition/ChapterSection";
import { MilestoneCard } from "@/components/exhibition/MilestoneCard";
import { ProgressIndicator } from "@/components/exhibition/ProgressIndicator";
import { FutureHorizon } from "@/components/exhibition/FutureHorizon";
import { WorldCanvas } from "@/components/exhibition/WorldCanvas";
import { chapters, milestones } from "@/data/journey";

export function Exhibition() {
  // Group milestones by chapter for inline rendering
  const milestonesByChapter = milestones.reduce(
    (acc, milestone) => {
      if (!acc[milestone.chapterId]) acc[milestone.chapterId] = [];
      acc[milestone.chapterId].push(milestone);
      return acc;
    },
    {} as Record<string, typeof milestones>
  );

  // Separate prologue and future from the middle chapters
  const middleChapters = chapters.filter(
    (ch) => ch.id !== "prologue" && ch.id !== "future"
  );

  return (
    <ExhibitionProvider>
      {/* The scroll track to create the timeline */}
      <div style={{ height: `${chapters.length * 100}vh` }} className="w-full" aria-hidden="true" />

      {/* The persistent evolving visual world */}
      <div className="fixed inset-0 z-0">
        <WorldCanvas />
      </div>

      {/* Progress navigation */}
      <ProgressIndicator />

      {/* Skip to content link for accessibility */}
      <a
        href="#prologue"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to exhibition
      </a>

      {/* The fixed stage */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Prologue — the entrance */}
        <Prologue />

        {/* Chapters 1-6 with milestones woven in */}
        {middleChapters.map((chapter) => (
          <div key={chapter.id} className="absolute inset-0">
            <ChapterSection chapter={chapter} />

            {/* Milestones that belong to this chapter */}
            <div className="absolute inset-0 flex items-center justify-center">
              {milestonesByChapter[chapter.id]?.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </div>
        ))}

        {/* Future — the intentionally unfinished ending */}
        <FutureHorizon />
      </div>
    </ExhibitionProvider>
  );
}
