# Xayrullo Nematov — Portfolio

Premium portfolio for an AI engineer, open-source developer, and founder of Hamma Labs.

## Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Framer Motion** — reveals, staggered animations, magnetic buttons
- **Lenis** — smooth scrolling

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
  app/           # Layout, page, SEO
  components/
    layout/      # Nav, footer, cursor, smooth scroll
    sections/    # Hero → Contact
    ui/          # Reveal, buttons, visuals
  data/          # Content & project copy
```

## Design

- Background `#050505` · Surface `#101010` · Text `#F5F5F5` · Muted `#8A8A8A` · Accent `#6C63FF`
- Display: Syne · Body: Inter · Mono: JetBrains Mono
- Motion respects `prefers-reduced-motion`
