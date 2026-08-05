/**
 * FROM STONE TO SYSTEMS — Progress State Engine
 * 
 * One deterministic progress model drives the entire experience.
 * Scroll position maps to a continuous 0→1 journey progress,
 * which determines the active chapter, transition state, and
 * visual evolution phase.
 */

import { chapters, type ChapterId } from "@/data/journey";

// ─── Progress State ──────────────────────────────────────────────────

export interface ProgressState {
  /** Global journey progress 0→1 */
  progress: number;
  /** Currently active chapter index (0-7) */
  activeChapterIndex: number;
  /** Active chapter ID */
  activeChapterId: ChapterId;
  /** Progress within the current chapter 0→1 */
  chapterProgress: number;
  /** Whether we're in a transition between chapters */
  isTransitioning: boolean;
  /** Transition blend factor 0→1 (0 = fully current, 1 = fully next) */
  transitionBlend: number;
  /** Visual complexity level 0→1 (increases monotonically) */
  visualComplexity: number;
  /** Whether a milestone is currently in the reveal zone */
  milestoneActive: boolean;
}

// ─── Chapter Boundaries ──────────────────────────────────────────────

const TOTAL_CHAPTERS = chapters.length; // 8 (prologue + 7)
const CHAPTER_SIZE = 1 / TOTAL_CHAPTERS;
const TRANSITION_ZONE = 0.15; // 15% of chapter size used for transitions

/**
 * Compute the full progress state from a raw scroll progress value (0→1).
 * This is the single source of truth for the entire experience.
 */
export function computeProgress(rawProgress: number): ProgressState {
  const progress = Math.max(0, Math.min(1, rawProgress));
  
  // Determine which chapter we're in
  const rawChapterIndex = progress * TOTAL_CHAPTERS;
  const activeChapterIndex = Math.min(
    Math.floor(rawChapterIndex),
    TOTAL_CHAPTERS - 1
  );
  
  // Progress within this chapter (0→1)
  const chapterProgress = rawChapterIndex - activeChapterIndex;
  
  // Transition detection — are we in the transition zone between chapters?
  const isTransitioning = chapterProgress > (1 - TRANSITION_ZONE) && activeChapterIndex < TOTAL_CHAPTERS - 1;
  const transitionBlend = isTransitioning
    ? (chapterProgress - (1 - TRANSITION_ZONE)) / TRANSITION_ZONE
    : 0;
  
  // Visual complexity increases monotonically with progress
  // but with a slight acceleration curve to make early chapters simpler
  const visualComplexity = easeInOutCubic(progress);
  
  return {
    progress,
    activeChapterIndex,
    activeChapterId: chapters[activeChapterIndex].id,
    chapterProgress,
    isTransitioning,
    transitionBlend,
    visualComplexity,
    milestoneActive: false, // Set by milestone intersection observer
  };
}

/**
 * Get the scroll progress boundaries for a specific chapter.
 * Used by intersection observers and scroll-to navigation.
 */
export function getChapterBounds(index: number): { start: number; end: number } {
  return {
    start: index * CHAPTER_SIZE,
    end: (index + 1) * CHAPTER_SIZE,
  };
}

/**
 * Get interpolated color values between current and next chapter palettes.
 */
export function getInterpolatedPalette(state: ProgressState) {
  const current = chapters[state.activeChapterIndex].palette;
  const next = chapters[Math.min(state.activeChapterIndex + 1, TOTAL_CHAPTERS - 1)].palette;
  
  if (!state.isTransitioning) return current;
  
  return {
    primary: lerpColor(current.primary, next.primary, state.transitionBlend),
    secondary: lerpColor(current.secondary, next.secondary, state.transitionBlend),
    bg: lerpColor(current.bg, next.bg, state.transitionBlend),
    glow: next.glow, // Glow transitions immediately
  };
}

// ─── Utility Functions ───────────────────────────────────────────────

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpColor(a: string, b: string, t: number): string {
  const parseHex = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16),
    ];
  };
  
  try {
    const [ar, ag, ab] = parseHex(a);
    const [br, bg, bb] = parseHex(b);
    
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const bv = Math.round(ab + (bb - ab) * t);
    
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bv.toString(16).padStart(2, "0")}`;
  } catch {
    return a;
  }
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/**
 * Clamp and map — ensures value stays within output range.
 */
export function clampedMap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const clamped = Math.max(inMin, Math.min(inMax, value));
  return mapRange(clamped, inMin, inMax, outMin, outMax);
}
