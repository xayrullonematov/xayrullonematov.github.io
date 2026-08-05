"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  delay?: number; // ms
}

export function ScrambleText({ text, isActive, className = "", delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const iterations = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText("");
      iterations.current = 0;
      return;
    }

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iterations.current) {
                return text[index];
              }
              if (letter === " ") return " ";
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iterations.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        iterations.current += 1 / 3; // Controls speed of reveal
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, isActive, delay]);

  return <span className={className}>{displayText || text}</span>;
}
