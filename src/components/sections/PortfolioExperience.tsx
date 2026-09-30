"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { PortfolioHero } from "./PortfolioHero";
import { PortfolioContent, type PortfolioSection } from "./PortfolioContent";

const sections: { id: PortfolioSection; label: string }[] = [
  { id: "story", label: "Story" },
  { id: "work", label: "Projects" },
  { id: "results", label: "Small wins" },
  { id: "contact", label: "Contact" },
];

export function PortfolioExperience() {
  const [active, setActive] = useState<PortfolioSection | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const openSection = (href: string) => {
    const selected = sections.find(section => href === `#${section.id}`);
    if (!selected) return;
    opener.current = document.activeElement as HTMLElement | null;
    setActive(selected.id);
  };

  useEffect(() => {
    if (!active) return;
    const modal = dialog.current;
    if (!modal?.open) modal?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (scroller.current) scroller.current.scrollTop = 0;
    return () => { document.body.style.overflow = previousOverflow; };
  }, [active]);

  const close = () => {
    setActive(null);
    const target = opener.current?.isConnected
      ? opener.current
      : document.querySelector<HTMLButtonElement>('#top button[aria-controls]');
    target?.focus({ preventScroll: true });
  };

  return <>
    <PortfolioHero onNavigate={openSection} />
    <dialog ref={dialog} className="portfolio-dialog" aria-labelledby="section-title" onClose={close}>
      <header className="section-toolbar">
        <h2 id="section-title">{sections.find(section => section.id === active)?.label ?? "Portfolio"}</h2>
        <button type="button" autoFocus onClick={() => dialog.current?.close()} className="section-close" aria-label="Close section and return home">
          <span>Back home</span><X size={20} aria-hidden="true" />
        </button>
        <nav aria-label="Portfolio sections">
          {sections.map(section => <button type="button" key={section.id}
            aria-pressed={active === section.id} onClick={() => setActive(section.id)}>
            {section.label}
          </button>)}
        </nav>
      </header>
      <div ref={scroller} className="section-scroll">
        {active && <PortfolioContent section={active} />}
      </div>
    </dialog>
  </>;
}
