"use client";

import { useEffect, useId, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  title: string; image: string; href?: string; category?: string; logoClassName?: string;
  description?: string; noteLabel?: string; note?: string; actionLabel?: string;
}
export interface WorksWheelProps extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[]; label?: string; action?: string; introduction?: ReactNode;
}

// Overview is intentionally unselected. The actual logo elements move into the
// reading view; details only mount after an explicit selection or scroll gesture.
export function WorksWheel({ items, label = "Selected work", action = "View project", introduction, className, ...props }: WorksWheelProps) {
  const [active, setActive] = useState<number | null>(null);
  const [introVisible, setIntroVisible] = useState(Boolean(introduction));
  const [ready, setReady] = useState(!introduction);
  const [width, setWidth] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const lastWheel = useRef(0);
  const wheelAmount = useRef(0);
  const reduced = useReducedMotion();
  const id = useId();
  const current = active === null ? undefined : items[active];
  const compact = width <= 720;
  const overview = active === null;
  const choose = (index: number) => setActive(Math.max(0, Math.min(items.length - 1, index)));

  useEffect(() => {
    if (!introduction) return;
    if (reduced) { setIntroVisible(false); setReady(true); return; }
    const timer = window.setTimeout(() => setIntroVisible(false), 1400);
    return () => window.clearTimeout(timer);
  }, [introduction, reduced]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const read = () => setWidth(el.clientWidth);
    const observer = new ResizeObserver(read);
    read(); observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || !ready || compact || reduced) return;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if ((event.target as HTMLElement).closest(".wheel-detail")) return;
      const direction = Math.sign(event.deltaY);
      if ((active === null && direction < 0) || (active === items.length - 1 && direction > 0)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel.current < 850) return;
      wheelAmount.current += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientHeight : 1);
      if (Math.abs(wheelAmount.current) < 55) return;
      lastWheel.current = now; wheelAmount.current = 0;
      setActive(value => value === null ? 0 : value === 0 && direction < 0 ? null : Math.min(items.length - 1, value + direction));
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [active, compact, reduced, items.length, ready]);

  if (!items.length) return null;
  const ringW = compact ? Math.min(width * .32, 150) : Math.min(width * .25, 220);
  const selectedW = compact ? Math.min(width * .48, 210) : Math.min(width * .32, 340);
  const cardW = overview ? ringW : selectedW;
  const cardH = cardW / 1.45;
  const radius = ringW / 1.45 * 1.08;
  const transition = { duration: reduced ? 0 : .7, ease: [.22, 1, .36, 1] as [number, number, number, number] };

  return <section className={cn("works-wheel", className)} data-view={overview ? "overview" : "project"} aria-label={label} {...props}>
    <AnimatePresence onExitComplete={() => setReady(true)}>
      {introVisible && <motion.div key="introduction" className="wheel-introduction"
        initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduced ? 0 : -18 }}
        transition={{ duration: reduced ? 0 : .4, ease: [.22, 1, .36, 1] }}>
        {introduction}
      </motion.div>}
    </AnimatePresence>
    <motion.div className="wheel-browser" inert={!ready} aria-hidden={!ready}
      style={{ visibility: ready ? "visible" : "hidden" }}
      initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : .5 }}>
    {!overview && <div className="wheel-index" aria-label="Choose a project">
      {items.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} aria-controls={`${id}-detail`} onClick={() => choose(index)}><span>0{index + 1}</span>{item.title}</button>)}
    </div>}
    <div ref={stage} className="wheel-stage" tabIndex={0} role="region" aria-label="Project wheel. Use left and right arrow keys or the project buttons."
      onKeyDown={event => {
        if ((event.target as HTMLElement).closest(".wheel-detail")) return;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); choose(active === null ? 0 : active + 1); }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); active === 0 ? setActive(null) : choose((active ?? 1) - 1); }
        if (event.key === "Home") { event.preventDefault(); setActive(null); }
        if (event.key === "End") { event.preventDefault(); choose(items.length - 1); }
      }}
      onPointerDown={event => { if ((event.target as HTMLElement).closest(".wheel-detail")) return; gesture.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
      onPointerMove={event => { if (gesture.current && Math.abs(event.clientX - gesture.current.x) > 12) dragged.current = true; }}
      onPointerUp={event => {
        if (gesture.current) {
          const dx = event.clientX - gesture.current.x, dy = event.clientY - gesture.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) choose(active === null ? 0 : active + (dx < 0 ? 1 : -1));
        }
        gesture.current = null;
      }}
      onPointerCancel={() => { gesture.current = null; dragged.current = false; }}>
      <div className="wheel-ring-label" aria-hidden="true" style={{ opacity: overview ? 1 : 0 }}>Small tools.<br /><span className="highlight">Real problems.</span></div>
      {items.map((item, index) => {
        const angle = index * 360 / items.length, radians = angle * Math.PI / 180;
        const visible = overview || index === active;
        return <motion.button type="button" key={item.title} className="wheel-card" aria-label={`Select ${item.title}`} aria-hidden={!visible} tabIndex={visible ? 0 : -1}
          onClick={() => { if (!dragged.current) choose(index); }} initial={false}
          animate={{ x: overview ? Math.sin(radians) * radius : compact ? 0 : -width * .285, y: overview ? -Math.cos(radians) * radius : 0,
            rotate: overview ? angle : 0, scale: overview ? .72 : index === active ? 1 : .65,
            opacity: visible ? 1 : 0, width: cardW, height: cardH, marginLeft: -cardW / 2, marginTop: -cardH / 2 }}
          transition={transition} style={{ zIndex: index === active ? 3 : 1, pointerEvents: visible ? "auto" : "none" }}>
          <span className={cn("wheel-logo", item.logoClassName)}><img src={item.image} alt={`${item.title} logo`} draggable={false} width={320} height={220} /></span>
        </motion.button>;
      })}
      <div id={`${id}-detail`} className="wheel-detail-slot">
        <AnimatePresence mode="wait" initial={false}>
          {current && <motion.article key={current.title} className="wheel-detail" aria-label={`${current.title} project details`}
            initial={{ opacity: 0, x: reduced ? 0 : 64 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -24 }} transition={{ ...transition, duration: reduced ? 0 : .5 }}>
            <span className="mono">{current.category}</span><h3>{current.title}</h3><p>{current.description}</p>
            {current.note && <div className="tiny-result"><b>{current.noteLabel}</b><span>{current.note}</span></div>}
            {current.href && <a className="project-link" href={current.href} target="_blank" rel="noopener noreferrer">{current.actionLabel ?? action}</a>}
          </motion.article>}
        </AnimatePresence>
      </div>
    </div>
    <motion.div className={cn("wheel-controls", overview && "wheel-controls-overview")}
      initial={false} animate={{ opacity: ready ? 1 : 0, y: ready || reduced ? 0 : 8 }} transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : .15 }}>
      {overview ? <span className="wheel-invitation">Pick a logo. Meet the project.</span> : <button type="button" onClick={() => setActive(null)}>All projects</button>}
      {!overview && <span className="wheel-position" aria-live="polite">0{active + 1} / 0{items.length}</span>}
      <div className="wheel-step-controls">
        {!overview && <button type="button" onClick={() => choose(active - 1)} disabled={active === 0}>Previous</button>}
        <motion.button type="button" className={overview ? "wheel-explore" : undefined}
          whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: .97 }}
          onClick={() => choose(overview ? 0 : active + 1)} disabled={active === items.length - 1}>{overview ? "Explore projects" : "Next"}</motion.button>
      </div>
    </motion.div>
    </motion.div>
  </section>;
}
export default WorksWheel;
