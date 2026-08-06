<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


<!-- BEGIN:brand-system -->

# Brand System — "From Stone to Systems"

> Defined: 2026-08-06. This is the single source of truth for all design decisions.
> Do not deviate without updating this document first.

---

## Design Reference

- **Primary reference**: lusion.co — full-bleed 3D/WebGL as content, not background. Typography at extreme scale. One thing on screen at a time.
- **Inspiration sources**: Awwwards, Godly, Dark Mode Design, The FWA
- **Personality**: Bold/Expressive (Option C) — big headlines, strong color moments, personality-forward
- **Color direction**: Monochrome + one accent (Option A) — near-black bg, one strong accent per chapter
- **Visual metaphor**: Literal (Option A) — stone/earth early → glass/circuit/light late. Weight, texture, and color ALL evolve.

---

## Core Concept: Geological Time

Early chapters feel **heavy, raw, textured** — stone, earth, rough edges, thin typography.
Late chapters feel **precise, luminous, electric** — glass, circuit, light, ultra-bold typography.
Visual weight literally lightens as you scroll forward through time.

---

## Typography

| Role | Font | Behavior |
|---|---|---|
| Display (titles) | **Bricolage Grotesque** (variable font) | `wght` 200→900 driven by scroll position |
| Body | **Inter** | Static 400 |
| Mono | **JetBrains Mono** | Static 500 |

**Variable weight rule**: chapter title font-weight is scroll-driven.
- Ch.01 Curiosity → `font-weight: 200` (thin, scratched, uncertain)
- Ch.02 Survival → `font-weight: 300`
- Ch.03 Discovery → `font-weight: 400`
- Ch.04 Building → `font-weight: 600`
- Ch.05 Open Source → `font-weight: 700`
- Ch.06 AI → `font-weight: 800`
- Ch.07 Future → `font-weight: 900` (ultra-black, machine-like)

This IS the "From Stone to Systems" metaphor made visual.

---

## Color Palette — Per Chapter

Each chapter has its own background and accent. Colors evolve, never reset.

| Chapter | ID | Background | Accent | Feeling |
|---|---|---|---|---|
| 00 | prologue | `#0a0905` | `#c8b89a` | Parchment, aged paper |
| 01 | curiosity | `#0d0a06` | `#c8a96e` | Warm earth, clay |
| 02 | survival | `#060a0d` | `#5a8fa8` | Cold, constrained, blue-grey |
| 03 | discovery | `#060d08` | `#6aad72` | First green, growth |
| 04 | building | `#0d0806` | `#e0622a` | Hot, forge, fire orange |
| 05 | opensource | `#08060d` | `#6c4fe0` | Electric purple |
| 06 | ai | `#050810` | `#3d9eff` | Luminous blue |
| 07 | future | `#08090f` | `#e8e4dc` | Near-white light |

---

## Layout Rules

- **One dominant element per screen** — either the title (80-90% viewport height) OR the quote (full-width centered 5-8vw) OR a stat. Never all three at once.
- **No cards, no containers, no rounded boxes** — text sits directly on the canvas with a localized dark vignette behind it only
- **No backdrop-blur** — forbidden. Blur makes content feel cheap.
- **No two-column text grids** — each chapter is a single visual statement
- **Chapter number**: bottom-right corner, `15vw` font-size, accent color at 6% opacity — architectural detail, not decoration
- **Margins**: `6vw` left padding on desktop, `24px` mobile — generous, editorial breathing room

---

## Canvas / Background Rules

The WorldCanvas must evolve WITH the chapter content, not be generic:

| Phase | Visual | Chapters |
|---|---|---|
| Stone | Noise texture + scattered coarse dots, slow drift | 0–1 |
| Fragments | Fine grain + broken short lines, irregular | 2 |
| Structure | Clean geometric grid lines emerging | 3 |
| Modules | Rectangular clusters with strong edges | 4 |
| Networks | Connected nodes, inter-cluster lines | 5 |
| Intelligence | Pulsing animated data flows on edges | 6 |
| Open Edges | Nodes flying outward beyond viewport | 7 |

---

## Animation Rules

| Element | Animation | Do NOT use |
|---|---|---|
| Title reveal | `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` — curtain wipe left to right | ~~fade~~, ~~blur~~ |
| Quote | Word-by-word slide-up, 40ms stagger per word | ~~letter scramble~~, ~~blur~~ |
| Font weight | `useTransform(scrollProgress, [chStart, chEnd], [200, 900])` — continuous | ~~step jumps~~ |
| Body text | Simple `opacity: 0→1`, `y: 20→0`, no stagger longer than 60ms | ~~blur filter~~, ~~long stagger~~ |
| Page entrance | `scale: 0.96→1` + `opacity: 0→1`, 600ms, `cubic-bezier(0.22, 1, 0.36, 1)` | ~~slide from bottom~~ |
| Scroll feel | Lenis `lerp: 0.12`, no `syncTouch` on mobile | ~~snap-mandatory on mobile~~ |

---

## What Is Permanently Forbidden

These patterns degrade quality and must never return:

- `backdrop-blur-*` on content containers
- `bg-[color]/80` semi-transparent overlay cards over the canvas
- `ScrambleText` — replaced by curtain wipe reveal
- Two-column text layout on chapter sections
- Mobile progress bars (Instagram Stories style) — replaced by single thin bottom progress line
- `filter: blur()` on any animated element
- Stagger delays longer than `0.08s` per item
- Any `initial` / `animate` pattern that doesn't reset on re-entry (`isActive` must drive all states)

---

## Fonts to Install

```bash
# Add to next/font in layout.tsx:
Bricolage_Grotesque — axes: wght 200..900
Inter — axes: wght 100..900 (variable)
JetBrains_Mono — keep current
```

```css
/* Variable weight title usage: */
font-variation-settings: 'wght' var(--title-weight);
/* --title-weight driven by Framer Motion useTransform on scrollYProgress */
```

---

## Implementation Order

When rebuilding, follow this sequence:
1. Install Bricolage Grotesque variable font in `layout.tsx`
2. Update `globals.css` — new CSS variables, remove old static palette
3. Update `journey.ts` — new bg/accent colors per chapter table above
4. Rewrite `WorldCanvas.tsx` — phase-based rendering per chapter
5. Rewrite `ChapterSection.tsx` — curtain wipe titles, word-by-word quotes, no cards
6. Rewrite `Prologue.tsx` — single giant title, minimal
7. Rewrite `MilestoneCard.tsx` — no backdrop-blur, inline on canvas
8. Update `FutureHorizon.tsx` — consistent with new system
9. Update `ProgressIndicator.tsx` — bottom thin line on mobile, side dots on desktop

<!-- END:brand-system -->
