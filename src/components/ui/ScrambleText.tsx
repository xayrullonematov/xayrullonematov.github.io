"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  delay?: number; // ms before scramble starts
}

export function ScrambleText({ text, isActive, className = "", delay = 0 }: ScrambleTextProps) {
  // null = not yet started (show nothing), string = in progress or done
  const [displayText, setDisplayText] = useState<string | null>(null);
  const iterations = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any running animation
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isActive) {
      // Reset fully so re-entry re-runs the scramble
      setDisplayText(null);
      iterations.current = 0;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      iterations.current = 0;

      intervalRef.current = setInterval(() => {
        const frame = Math.floor(iterations.current);

        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (letter === " ") return " ";
              if (index < frame) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iterations.current += 1 / 3;

        if (frame >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text); // Lock to final value
        }
      }, 30);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, isActive, delay]);

  // While inactive or before delay fires, show nothing (parent controls opacity)
  // Once started, show scramble. A non-null displayText means we've begun.
  return (
    <span className={className} aria-label={text}>
      {displayText ?? (isActive ? "" : text)}
    </span>
  );
}
