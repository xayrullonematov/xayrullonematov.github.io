# Xayrillo Ne’matov — Portfolio

Editorial personal portfolio with a reusable MinimalistHero, personal stories,
a swipeable university admissions gallery, authentic project logos, and contact links.

## Stack

Next.js App Router · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide

## Develop and build

```bash
npm ci
npm run dev
npm run build
```

The production build is a static export in `out/`. GitHub Actions publishes it
to GitHub Pages at [nematov.com](https://nematov.com). A Next.js server is not
required in production; `next start` is not used for static exports.

## Active source

- `src/app/page.tsx`: page composition
- `src/app/globals.css`: Tailwind tokens and editorial styles
- `src/components/ui/minimalist-hero.tsx`: reusable hero
- `src/components/ui/demo.tsx`: stock-image usage example (not published as a route)
- `src/components/sections/PortfolioHero.tsx`: real portfolio props
- `src/components/sections/PortfolioContent.tsx`: stories, gallery, projects, results
- `public/portfolio/`: portrait, logos, and acceptance letters
- `components.json`: shadcn configuration

The `@/*` alias maps to `src/*`; reusable UI components belong in
`src/components/ui`. See [integration notes](docs/minimalist-hero.md) for
dependencies, setup, accessibility, responsive behavior, and reuse.

The previous static `site/` release and historical exhibition components remain
in version control as reference. The current deployment builds the React app;
editing `site/index.html` no longer changes the homepage.
