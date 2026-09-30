"use client";

import React, { useId, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Menu, X, Pause, Play, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: React.ReactNode;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string };
  socialLinks: { icon: LucideIcon; href: string; label?: string }[];
  locationText: string;
  className?: string;
  onNavigate?: (href: string) => void;
}

const NavLink = ({ href, children, onClick }: {
  href: string; children: React.ReactNode; onClick?: () => void;
}) => (
  onClick ? <button type="button" onClick={onClick} aria-haspopup="dialog"
    className="inline-flex min-h-11 items-center text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground">
    {children}
  </button> : <a href={href}
    className="inline-flex min-h-11 items-center text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground">
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon, label }: {
  href: string; icon: LucideIcon; label?: string;
}) => (
  <a href={href} target={href.startsWith("https://") ? "_blank" : undefined}
    rel="noopener noreferrer" aria-label={label ?? href}
    className="inline-flex h-11 w-11 items-center justify-center text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" aria-hidden="true" />
  </a>
);

export const MinimalistHero = ({
  logoText, navLinks, mainText, readMoreLink, imageSrc, imageAlt,
  overlayText, socialLinks, locationText, className, onNavigate,
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const imageFailed = failedSrc === imageSrc;

  return (
    <MotionConfig reducedMotion="user">
      <section id="top" aria-label="Introduction"
        data-motion-paused={motionPaused}
        className={cn("relative isolate flex min-h-svh w-full flex-col items-center justify-between overflow-x-clip bg-background px-6 py-6 font-sans text-foreground sm:px-8 md:px-12 md:py-10", className)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}>
        <div className="load-line" aria-hidden="true" />
        <header className="hero-enter relative z-30 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <motion.a href="#top" initial={false}
            className="text-lg font-bold tracking-wide sm:text-xl">
            {logoText}
          </motion.a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => <NavLink key={link.href} href={link.href} onClick={onNavigate ? () => onNavigate(link.href) : undefined}>{link.label}</NavLink>)}
          </nav>
          <button ref={menuButton} type="button" onClick={() => setMenuOpen(open => !open)}
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen} aria-controls={menuId}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          {menuOpen && (
            <nav id={menuId} aria-label="Mobile navigation"
              className="flex w-full flex-col border-y border-foreground/20 py-3 md:hidden">
              {navLinks.map(link => (
                <NavLink key={link.href} href={link.href} onClick={onNavigate ? () => { setMenuOpen(false); onNavigate(link.href); } : undefined}>{link.label}</NavLink>
              ))}
            </nav>
          )}
        </header>

        <div className="relative grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 py-12 lg:grid-cols-[0.8fr_1.1fr_1fr] lg:gap-4 lg:py-20">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }}
            className="hero-enter hero-enter-copy relative z-20 order-3 text-center lg:order-1 lg:text-left">
            <p className="mx-auto max-w-xs text-base leading-relaxed text-foreground/80 lg:mx-0">{mainText}</p>
            {onNavigate ? <button type="button" onClick={() => onNavigate(readMoreLink)} aria-haspopup="dialog"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline decoration-from-font underline-offset-4">Read More</button> : <a href={readMoreLink}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline decoration-from-font underline-offset-4">
              Read More
            </a>}
          </motion.div>

          <div className="hero-enter hero-enter-portrait relative order-2 flex min-w-0 items-center justify-center py-6">
            <div className="portrait-orbit aspect-square w-full max-w-[280px] shrink-0 sm:max-w-[340px] lg:max-w-[420px]">
            <div className="h-full w-full overflow-hidden rounded-full bg-[#24211e] shadow-2xl">
            {imageFailed ? (
              <div role="img" aria-label={imageAlt}
                className="flex h-full w-full items-center justify-center p-6 text-center text-sm">
                Portrait unavailable
              </div>
            ) : (
              <motion.img src={imageSrc} alt={imageAlt} width={640} height={640}
                fetchPriority="high"
                className="block h-full w-full object-cover object-center"
                initial={false}
                onError={() => setFailedSrc(imageSrc)} />
            )}
            </div>
            </div>
          </div>

          <motion.div initial={false} className="hero-enter hero-enter-title relative z-20 order-1 min-w-0 text-center lg:order-3 lg:text-left">
            <h1 className="break-words text-[clamp(3.5rem,6vw,6rem)] font-extrabold leading-[0.94] tracking-[-0.055em]">
              {overlayText.part1}<br /><span className="highlight">{overlayText.part2}</span>
            </h1>
          </motion.div>
        </div>

        <footer className="relative z-30 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-foreground/15 pt-5">
          <div className="-ml-3 flex items-center gap-1">
            {socialLinks.map(link => <SocialIcon key={link.href} {...link} />)}
          </div>
          <p className="text-sm font-medium text-foreground/70">{locationText}</p>
          <button type="button" className="motion-toggle" aria-pressed={motionPaused} onClick={() => setMotionPaused(paused => !paused)} aria-label={motionPaused ? "Resume ambient animation" : "Pause ambient animation"}>
            {motionPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}<span>{motionPaused ? "Motion off" : "Motion on"}</span>
          </button>
        </footer>
      </section>
    </MotionConfig>
  );
};
