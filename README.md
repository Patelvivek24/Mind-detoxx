# Mind Detoxx — Website & Studio Admin

One Next.js 16 (App Router) project containing two applications:

| App | URL | Stack |
| --- | --- | --- |
| **Public website** | `/`, `/about-us`, `/activities`, `/schedule`, `/retreats`, `/studio-on-rent` | React-Bootstrap, SCSS modules, three.js background |
| **Studio admin** | `/admin/**` | Plain global SCSS, lucide-react icons, browser-local demo data |

```bash
npm run dev     # http://localhost:3000 and http://localhost:3000/admin
npm run build
npm run lint
```

## How the two apps are separated

Each app has its **own root layout** via route groups, so their global CSS, fonts and
providers never mix (navigating between them does a full page load):

- `app/(client)/layout.tsx` — Bootstrap + `styles/client/globals.css`, background, Navbar, Footer.
- `app/(admin)/layout.tsx` — `styles/admin/admin.scss`, `StudioProvider`, `AdminShell` (sidebar/topbar/modal).
- `app/global-not-found.tsx` — 404 for unmatched URLs (required with multiple root layouts;
  enabled by `experimental.globalNotFound` in `next.config.ts`).

Never import from `components/admin`, `features/admin` or `data/admin` in client-website
code, or vice versa.

## Folder guide (`src/`)

```
app/                    Routing only: layouts, page.tsx (metadata + composition), route boundaries
  (client)/             Public routes
  (admin)/admin/        Admin routes (+ error / loading / not-found)
  api/studio/route.ts   GET seed data / POST echo (unused by the UI today)
components/
  client/layout/        Navbar, Footer, Background — site chrome
  client/ui/            Reusable site UI: SectionTitle, cards, LightboxModal, WhatsAppButton
  admin/layout/         AdminShell, Sidebar, Topbar, PageHeading
  admin/ui/             Admin primitives: Button, Field, Modal, DataTable, Toolbar, SectionHeader, …
features/
  client/<page>/        Sections of one public page (+ its .module.scss)
  admin/<screen>/       One admin screen's components and helpers
  admin/entities/       Create/edit modal for every record kind (one form per kind)
data/
  client/*.json         Website content: one file per page/domain (see "Content data" below)
  client/*.ts           Typed accessor for each JSON file (+ runtime checks)
  admin/navigation.json Admin sidebar/headings (icons by name, resolved in navigation.ts)
  admin/options.json    Admin dropdown and filter option lists
  admin/seed.json       Starting dataset for the admin demo and GET /api/studio
hooks/                  Generic hooks (useListFilter)
lib/                    Framework-free helpers (formatters, whatsapp)
providers/              StudioProvider — admin state, persisted to localStorage
types/                  Admin domain types (studio.ts)
styles/
  client/               _variables.scss (use via @use "@/styles/client/variables"), globals.css
  admin/                admin.scss + partials (order in admin.scss = cascade order)
```

### Where new code goes

- **New public page:** `app/(client)/<route>/page.tsx` with metadata, rendering a
  `features/client/<page>/<Page>Content.tsx`. Keep sections Server Components; put state in
  the smallest possible `"use client"` child (see `PracticesCatalog`, `UpcomingEvents`).
- **New admin screen:** add its entry to `data/admin/navigation.ts` (title, icon, href), then
  `app/(admin)/admin/<route>/page.tsx` → `<PageHeading navKey="…" />` + `features/admin/<screen>/…`.
- **New record kind:** add the type to `types/studio.ts` (`EntityKind`, `EntityDraftMap`),
  a seed in `features/admin/entities/entityConfig.ts`, and a form in `entities/forms/`.
- **Reusable UI:** `components/<app>/ui/` only once a second screen needs it; otherwise keep it
  inside the feature folder.
- **Copy and content:** `data/client/*.json`, not inline JSX (see below).

## Content data (JSON)

All static website content lives in `src/data/client/*.json`; admin configuration lives in
`src/data/admin/*.json`. Edit the JSON to change text, links, prices or lists — no component
changes needed.

| File | Holds |
| --- | --- |
| `contact.json` | Address, phone numbers, WhatsApp lines, email, Instagram, map URLs — **the only place** these are defined |
| `home.json` | Hero banner, mantra ticker, closing call-to-action |
| `about.json` | About page + home "philosophy" teaser |
| `activities.json` | Practices catalogue, filter categories, home highlights |
| `pricing.json` | Home plans and schedule-page packages |
| `schedule.json` | Timetable, weekday highlights, page copy |
| `retreats.json` | Featured retreat, upcoming events, gallery, "Find us" copy |
| `studio-rental.json` | Rental page sections, rates, form options, home teaser |
| `navigation.json`, `footer.json` | Header and footer |

Rules:

- **Read JSON through its accessor** (`import { RETREATS } from "@/data/client/retreats"`), never
  import the `.json` directly. The accessor types it with `fromJson<T>()` (a malformed file fails
  `tsc`/`next build`) and runs `assertOneOf` checks on values that drive behaviour (categories,
  CTA variants, rate ↔ form options, admin icons/keys). Types live in `src/types/content.ts`.
- **Client components don't import data.** A Server Component parent passes the slice they need
  as props (see `RetreatsContent`, `StudioRentalContent`), so unrelated content stays out of
  the browser bundle.
- Keep in code, not JSON: anything with logic or interpolation (WhatsApp message templates with
  form values, entity seeds with generated ids), role-dependent option lists, table column
  renderers, editor field schemas tied to TypeScript keys, and form field labels.
- `admin/seed.json` is only the starting fixture. Admin edits are stored in the browser and are
  never written back to it.
- Never put secrets or credentials in these files — they are bundled into the site.

## Current limitations (pre-existing, unchanged by the restructure)

- **No authentication.** `/admin` is publicly reachable; the Super Admin / Staff switch is a
  client-side demo toggle. Add server-side protection (e.g. middleware/proxy + session) before
  deploying the admin.
- Admin data lives in the browser (`localStorage` key `mdx-admin-v2`); there is no backend or
  database, and the public site does not read admin content yet.
- No environment variables are used.
