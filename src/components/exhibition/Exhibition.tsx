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

import { EntranceScreen } from "@/components/exhibition/EntranceScreen";

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
      {/* The entrance gate for audio and immersion */}
      <EntranceScreen />

      {/* The scroll track to create the timeline */}
      <div style={{ height: `${chapters.length * 100}dvh` }} className="w-full relative" aria-hidden="true">
        {/* Invisible snap points for Instagram Reels style scrolling */}
        {chapters.map((chapter) => {
          // Prologue and Future have simpler snap logic
          if (chapter.id === "prologue") {
            return <div key={chapter.id} className="absolute w-full snap-start" style={{ top: "0%", height: "1px" }} />;
          }
          if (chapter.id === "future") {
            return <div key={chapter.id} className="absolute w-full snap-start" style={{ top: "100%", height: "1px" }} />;
          }

          const start = chapter.index / chapters.length;
          const end = (chapter.index + 1) / chapters.length;
          
          const chapterMilestones = milestonesByChapter[chapter.id] || [];
          const hasMilestone = chapterMilestones.length > 0;
          
          const fadeOutPoint = hasMilestone ? start + (end - start) * 0.40 : end;
          const maxFade = (fadeOutPoint - start) / 2.1; 
          const fade = Math.min(0.03, maxFade);

          // Snap at the moment the chapter text reaches full opacity
          const textSnapPoint = start + fade + 0.01; 
          
          return (
            <div key={chapter.id}>
              {/* Text snap point */}
              <div 
                className="absolute w-full snap-start" 
                style={{ top: `${textSnapPoint * 100}%`, height: '1px' }} 
              />
              
              {/* One snap point per milestone slot */}
              {hasMilestone && chapterMilestones.map((_, mi) => {
                const totalM = chapterMilestones.length;
                const slotSize = (0.95 - 0.50) / totalM;
                const slotStart = 0.50 + mi * slotSize;
                const snapAt = start + (end - start) * (slotStart + 0.02);
                return (
                  <div
                    key={mi}
                    className="absolute w-full snap-start"
                    style={{ top: `${snapAt * 100}%`, height: '1px' }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

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

        {middleChapters.map((chapter) => {
          const chapterMilestones = milestonesByChapter[chapter.id] || [];
          const hasMilestone = chapterMilestones.length > 0;
          return (
            <div key={chapter.id} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <ChapterSection chapter={chapter} hasMilestone={hasMilestone} />
              </div>

              {/* Milestones that belong to this chapter — rendered above chapter text */}
              <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pointer-events-none px-4 md:px-0" style={{ zIndex: 1 }}>
                {chapterMilestones.map((milestone, milestoneIndex) => (
                  <MilestoneCard
                    key={milestone.id}
                    milestone={milestone}
                    milestoneIndex={milestoneIndex}
                    totalMilestones={chapterMilestones.length}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Future — the intentionally unfinished ending */}
        <FutureHorizon />
      </div>
    </ExhibitionProvider>
  );
}
