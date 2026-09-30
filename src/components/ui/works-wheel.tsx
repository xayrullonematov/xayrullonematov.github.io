"use client";

// Adapted from the supplied WorksWheel: ring → perspective drum. Real logos,
// semantic buttons, bounded wheel input, touch controls, and no idle rAF loop.
import { useEffect, useId, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
  category?: string;
  description?: string;
  noteLabel?: string;
  note?: string;
  actionLabel?: string;
}
export interface WorksWheelProps extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
}

export function WorksWheel({ items, label = "Selected work", action = "View project", className, ...props }: WorksWheelProps) {
  const [active, setActive] = useState(0);
  const [ring, setRing] = useState(true);
  const [width, setWidth] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const reduced = useReducedMotion();
  const id = useId();
  const current = items[active];
  const compact = width < 640;
  const showRing = ring && !compact && !reduced;
  const choose = (index: number) => { setActive(Math.max(0, Math.min(items.length - 1, index))); setRing(false); };

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const resize = new ResizeObserver(() => setWidth(el.clientWidth));
    setWidth(el.clientWidth);
    resize.observe(el);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || compact || reduced) return;
    let last = 0;
    let accumulated = 0;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const direction = Math.sign(event.deltaY);
      if (!ring && ((active === 0 && direction < 0) || (active === items.length - 1 && direction > 0))) return;
      event.preventDefault();
      if (performance.now() - last < 650) return;
      accumulated += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientHeight : 1);
      if (Math.abs(accumulated) < 45) return;
      last = performance.now();
      accumulated = 0;
      if (ring) setRing(false);
      else setActive(value => Math.max(0, Math.min(items.length - 1, value + direction)));
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, [active, ring, compact, reduced, items.length]);

  if (!current) return null;
  const cardW = compact ? Math.min(width * .68, 310) : Math.min(width * .27, 240);
  const cardH = cardW / 1.45;
  const radius = cardH * 1.08;

  return <section className={cn("works-wheel", className)} aria-label={label} {...props}>
    <div className="wheel-index" aria-label="Choose a project">
      {items.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index && !showRing} aria-controls={`${id}-detail`} onClick={() => choose(index)}>
        <span>0{index + 1}</span>{item.title}
      </button>)}
    </div>
    <div ref={stage} className="wheel-stage" tabIndex={0} role="region" aria-label="Project wheel. Use left and right arrow keys or the project buttons."
      onKeyDown={event => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); choose(active + 1); }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); choose(active - 1); }
        if (event.key === "Home") { event.preventDefault(); choose(0); }
        if (event.key === "End") { event.preventDefault(); choose(items.length - 1); }
      }}
      onPointerDown={event => { gesture.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
      onPointerMove={event => { if (gesture.current && Math.abs(event.clientX - gesture.current.x) > 12) dragged.current = true; }}
      onPointerUp={event => {
        if (gesture.current) {
          const dx = event.clientX - gesture.current.x;
          const dy = event.clientY - gesture.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) choose(active + (dx < 0 ? 1 : -1));
        }
        gesture.current = null;
      }}
      onPointerCancel={() => { gesture.current = null; dragged.current = false; }}>
      <div className="wheel-ring-label" aria-hidden="true" style={{ opacity: showRing ? 1 : 0 }}>Small tools.<br /><span className="highlight">Real problems.</span></div>
      {items.map((item, index) => {
        const angle = index * 360 / items.length;
        const radians = angle * Math.PI / 180;
        const distance = index - active;
        const visible = showRing || (!compact && !reduced ? Math.abs(distance) <= 1 : distance === 0);
        return <motion.button type="button" key={item.title} className="wheel-card" aria-label={`Select ${item.title}`} aria-hidden={!visible} tabIndex={visible ? 0 : -1}
          onClick={() => { if (!dragged.current) choose(index); }}
          initial={false}
          animate={{ x: showRing ? Math.sin(radians) * radius : -Math.abs(distance) * cardW * .24,
            y: showRing ? -Math.cos(radians) * radius : distance * cardH * 1.2,
            rotate: showRing ? angle : 0, rotateX: showRing || compact || reduced ? 0 : -distance * 48,
            scale: showRing ? .72 : distance === 0 ? 1 : .78,
            opacity: visible ? (showRing || distance === 0 ? 1 : .28) : 0 }}
          transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }}
          style={{ width: cardW, height: cardH, marginLeft: -cardW / 2, marginTop: -cardH / 2, zIndex: index === active ? 3 : 1, pointerEvents: visible ? "auto" : "none" }}>
          <img src={item.image} alt={`${item.title} logo`} draggable={false} width={320} height={220} />
        </motion.button>;
      })}
    </div>
    <div className="wheel-controls">
      <button type="button" onClick={() => choose(active - 1)} disabled={!showRing && active === 0}>Previous</button>
      <span aria-live="polite">{showRing ? "Select a project" : `0${active + 1} / 0${items.length}`}</span>
      <button type="button" onClick={() => choose(showRing ? 0 : active + 1)} disabled={!showRing && active === items.length - 1}>{showRing ? "Explore" : "Next"}</button>
    </div>
    <article id={`${id}-detail`} className="wheel-detail" aria-label={`${current.title} project details`}>
      <div key={current.title} className="section-enter">
        <span className="mono">{current.category}</span>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
        {current.note && <div className="tiny-result"><b>{current.noteLabel}</b><span>{current.note}</span></div>}
        {current.href && <a className="project-link" href={current.href} target="_blank" rel="noopener noreferrer">{current.actionLabel ?? action}</a>}
      </div>
    </article>
  </section>;
}

export default WorksWheel;
