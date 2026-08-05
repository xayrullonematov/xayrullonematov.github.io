/**
 * FROM STONE TO SYSTEMS — Exhibition Context Provider
 * 
 * Provides the global progress state to all exhibition components.
 * Uses scroll position from Lenis to drive one deterministic state model.
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import { computeProgress, type ProgressState } from "@/lib/progress";
import { chapters } from "@/data/journey";

// ─── Context ─────────────────────────────────────────────────────────

interface ExhibitionContextValue {
  state: ProgressState;
  /** Navigate to a specific chapter */
  goToChapter: (index: number) => void;
  /** Total scroll height of the exhibition */
  totalHeight: number;
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** Whether we're on a mobile device */
  isMobile: boolean;
}

const ExhibitionContext = createContext<ExhibitionContextValue | null>(null);

export function useExhibition() {
  const ctx = useContext(ExhibitionContext);
  if (!ctx) {
    throw new Error("useExhibition must be used within ExhibitionProvider");
  }
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────

const SECTION_HEIGHT = 100; // vh per chapter section
const TOTAL_SECTIONS = chapters.length;

export function ExhibitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => computeProgress(0));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalHeight = SECTION_HEIGHT * TOTAL_SECTIONS;
  const rafRef = useRef<number>(0);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    import('./AudioEngine').then(({ audio }) => {
      if (audio) {
        audio.setIntensity(state.progress);
      }
    });
  }, [state.progress]);

  // Detect preferences
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    
    const mqMobile = window.matchMedia("(max-width: 768px)");
    setIsMobile(mqMobile.matches);
    const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mqMobile.addEventListener("change", mobileHandler);
    
    return () => {
      mq.removeEventListener("change", handler);
      mqMobile.removeEventListener("change", mobileHandler);
    };
  }, []);

  // Scroll-driven state updates (throttled via rAF)
  useLenis(({ progress }) => {
    // Only update if progress actually changed
    if (Math.abs(progress - lastProgressRef.current) < 0.0001) return;
    lastProgressRef.current = progress;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setState(computeProgress(progress));
    });
  });

  // Chapter navigation
  const lenis = useLenis();
  const goToChapter = useCallback(
    (index: number) => {
      if (!lenis) return;
      const scrollTarget = (index / TOTAL_SECTIONS) * document.documentElement.scrollHeight;
      lenis.scrollTo(scrollTarget, { duration: 1.8 });
    },
    [lenis]
  );

  return (
    <ExhibitionContext.Provider
      value={{ state, goToChapter, totalHeight, reducedMotion, isMobile }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
}
