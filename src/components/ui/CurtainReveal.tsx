"use client";

import { motion } from "framer-motion";

interface CurtainRevealProps {
  children: React.ReactNode;
  isActive: boolean;
  delay?: number;   // seconds
  duration?: number; // seconds, default 0.75
  className?: string;
}

/**
 * Reveals content with a left-to-right curtain wipe using clip-path.
 * Driven entirely by isActive — resets instantly on exit so it replays
 * every time the chapter becomes active.
 */
export function CurtainReveal({
  children,
  isActive,
  delay = 0,
  duration = 0.75,
  className = "",
}: CurtainRevealProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      animate={
        isActive
          ? { clipPath: "inset(0 0% 0 0)" }
          : { clipPath: "inset(0 100% 0 0)" }
      }
      transition={{
        duration: isActive ? duration : 0, // instant reset on exit
        delay: isActive ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
