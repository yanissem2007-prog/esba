# ÉSBA — École Supérieure des Beaux-Arts d'Alger

Next.js 14 · TypeScript · Tailwind CSS

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at https://vercel.com/new — Vercel auto-detects Next.js.

## Structure

```
app/                 Routes (App Router)
  layout.tsx         Root layout — chrome, motion, lightbox
  page.tsx           Home (/)
  about/             /about
  programs/          /programs
  admissions/        /admissions
  student/           /student
  events/            /events
  library/           /library
  gallery/           /gallery
  contact/           /contact
  globals.css        Tailwind + design tokens
components/
  layout/            Chrome — Topbar, Nav, MobileMenu, Loader
  motion/            Motion layer — cursor, curtain, splits, lightbox
  PageContent.tsx    Server component — reads page HTML
lib/
  pages/             Per-route HTML content
styles/
  components.css     Base component styles
  awwwards.css       Refinement & motion layer
public/              Static assets
```

## Tech

- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS (with design tokens: navy / ivory / gold / stone)
- Custom motion layer (cursor, magnetic buttons, split text, clip reveals, page curtain)
- Zero runtime dependencies beyond React/Next
