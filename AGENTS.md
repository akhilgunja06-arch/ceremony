# Repository guide

Single-page Telugu wedding invitation for Tanusha & Mahesh (13 December 2026, Lingala).
React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide.

## Commands

```bash
npm install
npm run dev        # Vite on port 12000 (host 0.0.0.0, allowedHosts: true)
npm run build      # tsc -b && vite build -> dist/
npm run preview    # Vite preview on port 12001
npm run typecheck  # tsc --noEmit
```

## Structure

* `src/config/wedding.ts` — the single source of truth for names, dates, venue, messages, Sapta Padhi, photo slots and artwork. Never hardcode wedding copy in components.
* `src/config/sections.ts` — navigation sections (English + Telugu labels).
* `src/components/sections/*` — one file per page section, in page order: Blessing, Hero, CoupleIntro, Details, Venue, SaptaPadhi, Gallery, Family, Finale.
* `src/components/ui/*` — reusable chrome: Navigation, Countdown, Lightbox, PhotoFrame, Section, ornaments and backdrops.
* `public/photos`, `public/images` — drop-in assets; file names documented in README.md.

## Conventions

* All Telugu text uses `font-telugu` and `lang="te"`; English display type uses `font-display` (Playfair), body copy uses Poppins.
* Palette tokens live in `src/index.css` under `@theme` (maroon/gold/blush). Use them instead of raw hex values.
* Framer Motion entrances must respect `useReducedMotion`; the petal canvas returns `null` when reduced motion is requested.
* Overlays (lightbox, drawer) render through portals or at the App root so section `z-index` stacking contexts do not clip them.
* Countdown, weekday and Google Maps URLs derive from `wedding.dateISO` / `wedding.venue`; do not duplicate them.

## Verification

No test runner. Validate with `npm run typecheck`, `npm run build`, and browser checks against the dev/preview hosts. Mobile breakpoints were checked at 390×844; ensure `document.documentElement.scrollWidth === window.innerWidth`.
