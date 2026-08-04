"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, navLinks } from "@/data/content";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.08] bg-bg/85 backdrop-blur-xl py-3 shadow-lg"
            : "bg-transparent py-5",
        )}
      >
        <nav
          className="container flex items-center justify-between"
          aria-label="Primary"
        >
          {/* Logo with official PNG logo */}
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-surface shadow-md transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Xayrullo Nematov Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-text transition-colors group-hover:text-accent">
                {site.name}
              </span>
              <span className="mono text-[10px] text-muted tracking-wide hidden sm:block">
                Hamma Labs
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-text transition-colors relative group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-text"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <motion.span
                className="block h-0.5 bg-text origin-center w-6"
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-text w-4"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="block h-0.5 bg-text origin-center w-6"
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 p-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display text-3xl font-bold hover:text-accent transition-colors text-text"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              className="mt-8 flex gap-6 border-t border-white/10 pt-6"
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
