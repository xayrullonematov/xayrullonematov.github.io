"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        // Don't intercept native touch — mobile browsers handle momentum
        // scroll natively and Lenis + snap-mandatory fighting each other
        // is what blocks scrolling on iOS/Android.
        touchMultiplier: 2,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
