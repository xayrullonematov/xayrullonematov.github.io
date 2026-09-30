# MinimalistHero integration

## Existing stack and paths

This repository already includes Next.js App Router, React, TypeScript, Tailwind
CSS v4 (through `@tailwindcss/postcss`), and Framer Motion. No replacement project
or global context provider is required.

- Reusable UI: `src/components/ui/minimalist-hero.tsx`
- Example: `src/components/ui/demo.tsx` (not a public route)
- Production props: `src/components/sections/PortfolioHero.tsx`
- Preserved portfolio sections: `src/components/sections/PortfolioContent.tsx`
- Global theme/styles: `src/app/globals.css`
- Class-name helper: `src/lib/utils.ts`
- shadcn configuration: `components.json`

`@/*` resolves to `src/*` in `tsconfig.json`. Therefore `@/components/ui`
means `src/components/ui`, not a second `/components/ui` at the repository root.
Keeping reusable primitives in this folder makes generated shadcn imports work
and separates reusable components from portfolio-specific sections. The folder
already existed; do not create a competing root-level folder.

## Install and run

```bash
npm ci
npm run dev
npm run build
```

The lockfile includes `lucide-react`, `framer-motion`, `clsx`, and `tailwind-merge`.
Lucide is pinned to 0.468.0 because the supplied demo imports brand icons removed
from newer releases. Framer Motion was already installed. Tailwind's background
and foreground tokens are mapped in `globals.css`.

For a separate project without shadcn, use `npx shadcn@latest init`, configure
the UI alias as `@/components/ui`, and install
`lucide-react@0.468.0 framer-motion clsx tailwind-merge`. Choose TypeScript when
creating that project. Tailwind v4 uses `@import "tailwindcss"` and the
`@tailwindcss/postcss` plugin rather than a mandatory tailwind.config file.
Do not reinitialize this configured repository.

## Props and state

The component retains the supplied text, navigation, portrait, overlay, social,
location, and className props. Optional social `label` values provide accessible
link names. Pass actual Lucide components from a client wrapper, not across a
Next.js server/client serialization boundary.

State is local: mobile menu visibility and failed-image fallback. Escape closes
the menu and returns focus to its button; selecting a navigation link closes it.
No external store or provider is needed. MotionConfig respects reduced motion.
The image fallback is text, never a random person's replacement portrait.

Desktop uses the supplied text/portrait/headline composition. Below 1024px it
stacks to avoid overlap; below 768px navigation becomes a disclosure menu. Height
is `min-height: 100svh`, not a clipped fixed viewport. Essential content is
visible in the server-rendered HTML, even without animation or JavaScript.

The standalone demo uses an Unsplash stock portrait. The production portfolio
deliberately keeps Xayrillo's supplied portrait and real contact links.

## Hero-only landing view

The portrait uses a square `object-cover` image inside a circular overflow-hidden
container, centered on the face. The source portrait is unchanged and no yellow
surround is rendered. Its original square framing keeps the head inside the crop.

`PortfolioExperience` owns the active section. Only the hero is shown initially,
including when an old `#story` URL is visited. Navigation and Read More use the
optional `onNavigate` callback to open a native modal dialog. Only the selected
section is mounted: Story also includes the admissions gallery. Switching sections
resets the panel scroll. Escape and Back home close it, restore focus, and unlock
background scrolling. No additional component package is needed for the dialog.

## Motion, shared brand, and project wheel

Active headings and body text use Manrope, with copper emphasis on charcoal.
The compact modal toolbar repeats the homepage brand and offers Home plus the
four section buttons. Entrance CSS animates content without delaying access;
the portrait's outline rotates slowly and can be paused. Reduced-motion users
get static content, and the ambient animation pauses while a section is open.

`src/components/ui/works-wheel.tsx` adapts the supplied ring design.
Production items live in `PortfolioContent.tsx` and retain the approved project
descriptions, honest notes, URLs, and actual logo assets. No stock art is used.
Selection starts at null: the overview renders all three logos and no project
details. Selection collapses the headline, moves the same logo left, and mounts
its story on the right with a directional entrance. Mobile stacks the logo above
the story. All projects or Home resets the overview; End selects the last item.
Buttons, arrow keys, horizontal swipes, and bounded desktop wheel input select
projects. Scrolling over text remains native. Reduced motion removes transitions
and wheel interception; buttons still work. Framer Motion animates transitions
without an idle rAF loop.
No new dependencies, providers, setup commands, or second UI folder are needed.

## Publishing

GitHub Actions runs `npm ci` and `npm run build`, then publishes the `out/`
static export. `public/CNAME` preserves nematov.com. The previous `site/` release
and historical exhibition components are retained, but are not the active page.
Do not edit `site/index.html` expecting the React homepage to change.
