"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Faster lerp = more responsive, less "swimming" feeling
        lerp: 0.12,
        duration: 0.9,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        // Let mobile browsers handle touch natively — no interception
        touchMultiplier: 2,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
