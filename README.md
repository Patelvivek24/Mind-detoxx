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
  client/               Website copy, navigation, contact numbers
  admin/                Seed data, admin navigation (titles/icons/hrefs), shared option lists
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
- **Copy and content:** `data/client/*`, not inline JSX.

## Current limitations (pre-existing, unchanged by the restructure)

- **No authentication.** `/admin` is publicly reachable; the Super Admin / Staff switch is a
  client-side demo toggle. Add server-side protection (e.g. middleware/proxy + session) before
  deploying the admin.
- Admin data lives in the browser (`localStorage` key `mdx-admin-v2`); there is no backend or
  database, and the public site does not read admin content yet.
- No environment variables are used.
