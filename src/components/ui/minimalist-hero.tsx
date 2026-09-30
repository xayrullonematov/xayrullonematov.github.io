"use client";

import React, { useId, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string };
  socialLinks: { icon: LucideIcon; href: string; label?: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children, onClick }: {
  href: string; children: React.ReactNode; onClick?: () => void;
}) => (
  <a href={href} onClick={onClick}
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
  overlayText, socialLinks, locationText, className,
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const imageFailed = failedSrc === imageSrc;

  return (
    <MotionConfig reducedMotion="user">
      <section id="top" aria-label="Introduction"
        className={cn("relative isolate flex min-h-svh w-full flex-col items-center justify-between overflow-x-clip bg-background px-6 py-6 font-sans text-foreground sm:px-8 md:px-12 md:py-10", className)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}>
        <header className="relative z-30 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <motion.a href="#top" initial={false}
            className="text-lg font-bold tracking-wide sm:text-xl">
            {logoText}
          </motion.a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
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
                <NavLink key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
              ))}
            </nav>
          )}
        </header>

        <div className="relative grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 py-12 lg:grid-cols-[0.8fr_1.1fr_1fr] lg:gap-4 lg:py-20">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }}
            className="relative z-20 order-3 text-center lg:order-1 lg:text-left">
            <p className="mx-auto max-w-xs text-base leading-relaxed text-foreground/80 lg:mx-0">{mainText}</p>
            <a href={readMoreLink}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline decoration-from-font underline-offset-4">
              Read More
            </a>
          </motion.div>

          <div className="relative order-2 flex min-w-0 items-center justify-center py-6 md:min-h-[480px]">
            <motion.div aria-hidden="true" initial={false}
              animate={{ scale: [0.96, 1] }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute h-[280px] w-[280px] rounded-full bg-yellow-400/90 sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px]" />
            {imageFailed ? (
              <div role="img" aria-label={imageAlt}
                className="relative z-10 flex aspect-[4/5] w-56 items-center justify-center rounded-t-full bg-foreground/10 p-6 text-center text-sm md:w-64 lg:w-72">
                Portrait unavailable
              </div>
            ) : (
              <motion.img src={imageSrc} alt={imageAlt} width={640} height={800}
                fetchPriority="high"
                className="relative z-10 aspect-[4/5] w-56 rounded-t-full object-cover object-top shadow-2xl md:w-64 lg:w-72"
                initial={false} animate={{ y: [12, 0] }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onError={() => setFailedSrc(imageSrc)} />
            )}
          </div>

          <motion.div initial={false} className="relative z-20 order-1 min-w-0 text-center lg:order-3 lg:text-left">
            <h1 className="break-words text-[clamp(3.5rem,6vw,6rem)] font-extrabold leading-[0.94] tracking-[-0.055em]">
              {overlayText.part1}<br />{overlayText.part2}
            </h1>
          </motion.div>
        </div>

        <footer className="relative z-30 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-foreground/15 pt-5">
          <div className="-ml-3 flex items-center gap-1">
            {socialLinks.map(link => <SocialIcon key={link.href} {...link} />)}
          </div>
          <p className="text-sm font-medium text-foreground/70">{locationText}</p>
        </footer>
      </section>
    </MotionConfig>
  );
};
