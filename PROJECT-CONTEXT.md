# clean26 — Project Context & Handoff

> **FIRST TASK IN ANY NEW CONVERSATION:** Save an updated version of this file
> before the usage limit is approached. Run a quick `git log --oneline -5` and
> update the Recent Commits section, then commit and push this file so context
> is never lost.

---

## Repository

- **Repo:** `brookehoward2008-droid/clean26`
- **Live site:** `https://brookehoward2008-droid.github.io/clean26/index.html`
- **Working branch:** `claude/web-artifacts-builder-R8VFZ`
- **Open PR:** [#50 — Fix nav errors on all pages](https://github.com/brookehoward2008-droid/clean26/pull/50) (draft, ready to merge into `main`)

---

## Project Overview

EVCC Graph 130 / GRDS 130 web coding project for Brooke Howard.
Static HTML/CSS site hosted on GitHub Pages.

---

## File Structure

```
clean26/
├── index.html                  ← Home page (root)
├── scripts/
│   └── nav.js                  ← Shared site nav injected on every page
├── styles/
│   ├── nav.css                 ← Shared nav styles (kiwi class)
│   ├── islands.css             ← Orcas Island page styles
│   ├── sanjuan.css             ← San Juan Island page styles
│   ├── lopez.css               ← Lopez Island page styles
│   ├── cascade(brooke).css
│   ├── history-refactor.css
│   ├── stew.css
│   ├── theatre-2.css
│   ├── fluid.css
│   ├── media-queries.css
│   └── ...
├── pages/
│   ├── orcas.html              ← CSS Grid island page (done)
│   ├── sanjuan.html            ← CSS Grid island page (done)
│   ├── lopez.html              ← CSS Grid island page (done)
│   ├── history-refactor.html
│   ├── theatre.html
│   ├── theatre-2.html
│   ├── stew-recipe.html
│   ├── cascade.html
│   ├── fluid.html
│   ├── media-queries.html
│   └── nav.html                ← Legacy file, no longer used
├── images/
│   └── sj-001.jpg … sj-069.jpg ← San Juan Islands photo set
└── assets/
    └── *.mp3
```

---

## Nav System

`scripts/nav.js` injects the shared `<nav class="kiwi">` into `#nav-placeholder`
on every page via `outerHTML` replacement. **Do not add** `fetch('nav.html')`
blocks — that was the old broken pattern and has been removed from all pages.

Pages in `pages/` use `src="../scripts/nav.js"`.
`index.html` (root) uses `src="scripts/nav.js"`.

The nav depth logic in `nav.js`:
```js
const inPages = window.location.pathname.includes('/pages/');
// strips "pages/" prefix for siblings, adds "../" for root links
```

Current nav links (in order):
1. Home → `index.html`
2. History → `pages/history-refactor.html`
3. Theater Bill → `pages/theatre.html`
4. Village Theatre → `pages/theatre-2.html`
5. Stew Recipe → `pages/stew-recipe.html`
6. Cascade Mountains → `pages/cascade.html`
7. Optimized Images → `pages/opt-images.html` *(page not yet created)*
8. Fluid Dimensions → `pages/fluid.html`
9. Media Queries → `pages/media-queries.html`
10. Orcas Island → `pages/orcas.html`
11. San Juan Island → `pages/sanjuan.html`
12. Lopez Island → `pages/lopez.html`

---

## Island Pages — CSS Grid Assignment

Three pages using CSS Grid layout modeled on the Norway editorial design
(nomaauthentic.dk) shown in class. Instructor's wireframe from lecture
transcript: 3-column grid, 3 rows, items 1–7.

### Grid layout (all three pages identical structure)

```
Row 1: [ item1 — wide photo 2 cols ] [ item2 — text + pic ]
Row 2: [ item3 — photo ] [ item4 — text + pic ] [ item5 — photo ]
Row 3: [ item6 — text + pic ] [ item7 — wide photo 2 cols ]
```

- `item1`: `grid-column: 1/3`
- `item7`: `grid-column: 2/4`
- `item6`: `grid-column: 1/2` (1 col wide, text only row left side)
- `item2, item4, item6`: flex column, cream bg + SVG grain texture, left accent border
- `pic2, pic4, pic6`: 210px tall background-image thumbnails inside text cells

### Per-island accent colors

| Page | CSS file | Accent color | Character |
|---|---|---|---|
| Orcas | `islands.css` | `#3d6b5e` — forest teal | rugged, wooded |
| San Juan | `sanjuan.css` | `#3a5c7a` — slate blue | maritime, harbor |
| Lopez | `lopez.css` | `#5a6b3d` — sage green | pastoral, cycling |

Accent color is used on: grid gaps, nav bottom border, footer top border,
`.label` text, `.read-more` link, logo in header bar, left rule on `.island-text`.

### Images used (from `images/sj-*.jpg`)

| Cell | Orcas | San Juan | Lopez |
|---|---|---|---|
| hero | sj-034 | sj-003 | sj-051 |
| item1 | sj-015 | sj-008 | sj-053 |
| item3 | sj-025 | sj-013 | sj-056 |
| item5 | sj-068 | sj-018 | sj-059 |
| item7 | sj-022 | sj-023 | sj-060 |
| pic2 | sj-031 | sj-006 | sj-046 |
| pic4 | sj-047 | sj-029 | sj-063 |
| pic6 | sj-011 | sj-043 | sj-065 |

Content source for Orcas: https://www.visitsanjuans.com/itineraries/orcas-island-scenic-byway

### Orcas text content (current)

- **Activities / Hike & Explore:** Moran State Park (5,252 acres, 30+ mi trails),
  Mt. Constitution (2,409 ft), Obstruction Pass rainbow pebble beach
- **Lodging / Stay Awhile:** Deer Harbor sandy beach + B&Bs, Doe Bay Resort
  soaking tubs + sauna
- **Dining / Farm to Table:** Eastsound village hub, Kingfish at West Sound,
  Lascaux Café at Olga (1936 packing plant, 45 artists)

---

## Completed Work (this branch)

| Commit | Summary |
|---|---|
| `d94c21b` | Add color and texture to island pages |
| `9e50183` | Swap pic4 to sj-047 |
| `ad50ee7` | Swap pic4 image, remove top-center crop |
| `3f09c5d` | Update orcas.html with real content from visitsanjuans.com |
| `b7d7821` | Add San Juan Island and Lopez Island grid pages |
| `a2b7c9d` | Fix nav errors — remove stale fetch('nav.html') blocks |
| `d9898fb` | Fix nav.js href paths (404s on sibling pages) |
| `f6aced4` | Fix cut-off images in text cells |
| `6a68834` | Remove Contact placeholder from nav |
| `0ac5c9f` | Automated nav: nav.js injects kiwi nav on all pages |

---

## Known / Pending

- `pages/opt-images.html` is listed in nav but does not exist yet
- San Juan Island and Lopez Island pages have placeholder text — real content
  from visitsanjuans.com not yet added (only Orcas has real copy)
- PR #50 is a draft — user will push/merge manually
- User preference: **do not imprint claude** in any folder or file names

---

## Rules / Preferences

- Do not add Claude branding to folder names, file names, or code
- User pushes to remote themselves — always commit + push to
  `claude/web-artifacts-builder-R8VFZ`, then let user merge
- Nav uses `nav.js` only — never `fetch('nav.html')`
- Images referenced as `../images/sj-XXX.jpg` from inside `pages/`
- CSS variables at `:root` for all colors; use `var(--accent)` for island color
