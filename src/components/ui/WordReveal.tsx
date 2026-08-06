"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  isActive: boolean;
  delay?: number;   // seconds before first word
  stagger?: number; // seconds between words, default 0.04
  className?: string;
  wordClassName?: string;
}

/**
 * Reveals text word-by-word with a slide-up animation.
 * Each word is clipped so only the revealed portion shows.
 * Fully driven by isActive — resets instantly on exit.
 */
export function WordReveal({
  text,
  isActive,
  delay = 0,
  stagger = 0.04,
  className = "",
  wordClassName = "",
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
          aria-hidden
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            animate={
              isActive
                ? { y: 0, opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: isActive ? 0.5 : 0,
              delay: isActive ? delay + i * stagger : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
