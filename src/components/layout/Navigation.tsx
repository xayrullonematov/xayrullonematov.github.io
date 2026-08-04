"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, navLinks } from "@/data/content";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-bg/80 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav
          className="container flex h-[72px] items-center justify-between"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-text text-bg transition-transform duration-300 group-hover:rotate-[-8deg]">
              <span className="mono text-[11px] font-semibold tracking-tight">
                {site.shortName}
              </span>
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {site.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-10 p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="w-5 flex flex-col gap-1">
              <motion.span
                className="block h-px bg-text origin-center"
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-px bg-text"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="block h-px bg-text origin-center"
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[49] bg-bg flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display text-3xl hover:text-accent transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              className="mt-8 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="mono text-sm text-muted hover:text-text transition-colors">
                GitHub
              </a>
              <a href={`mailto:${site.email}`} className="mono text-sm text-muted hover:text-text transition-colors">
                Email
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
