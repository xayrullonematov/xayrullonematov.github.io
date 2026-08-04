"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  href,
  target,
  rel,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * strength, y: y * strength });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const sharedClass = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "rounded-full px-6 py-3 text-sm font-medium tracking-wide",
    "transition-colors duration-300",
    className,
  );

  const motionProps = {
    style: { x: offset.x, y: offset.y },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    transition: { type: "spring" as const, stiffness: 280, damping: 22, mass: 0.4 },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={sharedClass}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={sharedClass}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

export function PrimaryButton(props: MagneticButtonProps) {
  return (
    <MagneticButton
      {...props}
      className={cn(
        "bg-text text-bg hover:bg-white",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
        props.className,
      )}
    />
  );
}

export function GhostButton(props: MagneticButtonProps) {
  return (
    <MagneticButton
      {...props}
      className={cn(
        "border border-white/12 bg-transparent text-text",
        "hover:border-white/25 hover:bg-white/[0.04]",
        props.className,
      )}
    />
  );
}

export function AccentButton(props: MagneticButtonProps) {
  return (
    <MagneticButton
      {...props}
      className={cn(
        "bg-accent text-white",
        "shadow-[0_0_40px_-8px_var(--accent-glow)]",
        "hover:brightness-110",
        props.className,
      )}
    />
  );
}
