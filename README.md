# Tanusha ❤ Mahesh — Telugu Wedding Invitation

A premium, cinematic Telugu Hindu wedding invitation built with React, TypeScript, Tailwind CSS, Framer Motion and Lucide icons.

The experience opens with the blessings of Lord Venkateswara, welcomes guests with the couple's photographs, presents the wedding details and a live countdown, guides them through the seven sacred steps of Sapta Padhi, and closes with a warm final invitation.

---

## Run the site

```bash
npm install
npm run dev        # development server on http://localhost:12000
npm run build      # production build into dist/
npm run preview    # preview the production build on http://localhost:12001
npm run typecheck  # TypeScript check
```

---

## 1. All wedding information lives in one file

Open **`src/config/wedding.ts`**. Everything a guest reads comes from here:

| What you can edit | Field |
| --- | --- |
| Groom name, Telugu name | `couple.groom` |
| Bride name, Telugu name | `couple.bride` |
| Headline order (`TANUSHA ❤ MAHESH`) | `couple.display` |
| Wedding date and countdown target | `wedding.dateISO` |
| Displayed date, long date, time | `wedding.dateDisplay`, `dateLong`, `timeDisplay` |
| Wedding day (Sunday) | calculated automatically from `dateISO` |
| Venue name, address lines, maps search | `venue` |
| Parents' names | `families.groomParents`, `families.brideParents` |
| Every English and Telugu message | `messages` |
| The seven Sapta Padhi promises | `saptaPadhi` |
| Photograph slots and file names | `photos` |
| Optional Venkateswara artwork | `artwork` |

The weekday, Google Maps links and the countdown are all derived from the date and venue fields — you never need to edit them twice.

---

## 2. Photographs

The seven original photographs are stored in `public/photos/` and mapped in `src/config/wedding.ts`.

| Image | File | Section |
| --- | --- | --- |
| Romantic couple portrait 1 | `couple-romantic-1.png` | Couple gallery |
| Romantic couple portrait 2 | `couple-romantic-2.png` | Couple gallery |
| Bride's family | `bride-family-replacement.jpg` | Bride's family card |
| Groom portrait | `groom-portrait.png` | Couple section |
| Bride portrait | `bride-portrait.png` | Couple section |
| Couple together | `couple-together.png` | Couple gallery |
| Groom's family | `groom-family.png` | Groom's family card |

Empty photo-upload placeholders have been removed; there is no in-browser upload interface.

---

## 3. Optional devotional artwork

`public/images/welcome-background.jpg` is the welcome invitation background. The previous Venkateswara Swamy photo has been removed from the Blessing section.

---

## 5. Deploy

The production build is a static site in `dist/`.

* **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Enable Pages → Source: GitHub Actions once in the repository settings.
* **Any static host:** upload the contents of `dist/`.

---

## 6. Accessibility and performance

* `prefers-reduced-motion` disables the petal canvas and entrance animations.
* Lightbox and menu support Escape, arrow keys, focus styles and scroll locking.
* All controls have accessible labels; photographs have descriptive alternative text.
* Photographs load lazy (except the welcome image) and are decoded asynchronously.
* Mobile layouts stack the couple, the names and the action buttons with no horizontal scrolling.
