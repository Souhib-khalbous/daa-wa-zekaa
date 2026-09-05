# داء و ذكاء — studio site

A bilingual (Arabic / English) static marketing site for an automation studio,
built with Next.js and deployed to GitHub Pages as a static export.

Arabic is the default locale and the site is right-to-left; `/` redirects to
`/ar/`, and `/en/` serves the English translation.

## Running locally

Requires Node 22.13 or newer.

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3000>. To preview the production
static export instead:

```bash
npm run build
npm start
```

`npm run build` writes the export to `out/`. `npm start` serves that directory
on port 3000.

Other scripts: `npm run lint`, `npm run typecheck`, `npm run test:browser`
(Playwright), `npm run format`.

## Configuration

Copy `.env.example` to `.env.local` and fill it in. `.env.local` is ignored by
git and never committed.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | International number, digits only, no `+` or punctuation. The contact buttons stay disabled until it is set. |
| `NEXT_PUBLIC_SITE_URL` | for deploys | Canonical origin, no trailing slash. Feeds canonical tags, hreflang, and Open Graph. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | no | Footer link; the link is hidden when unset. |

Every one of these is a `NEXT_PUBLIC_` value, so all three are inlined into the
shipped HTML and are readable by anyone who loads the site. In CI they are set
as **repository variables**, not secrets — storing them as secrets would imply a
confidentiality the deployed site does not have.

To set them for deployment: *Settings → Secrets and variables → Actions →
Variables → New repository variable*.

### Brand assets

Two optional PNGs are detected at build time, the same way for both: drop the
file in and rebuild, no code change needed.

| File | Effect when present |
| --- | --- |
| `public/brand/logo.png` | Replaces the text wordmark in the header and footer. Width and height are read from the PNG header. |
| `public/brand/og.png` | Adds `og:image`/`twitter:image` and switches the Twitter card to `summary_large_image`. Use 1200x630. |

Without `og.png` the site still has title and description tags, but links shared
on WhatsApp, LinkedIn or Instagram render without a preview image.

### Theme

The header has a light/dark toggle. An inline script in the layout resolves the
theme before first paint - a stored choice in `localStorage` if there is one,
otherwise the visitor's `prefers-color-scheme` - and sets `data-theme` on
`<html>`, so there is no flash of the wrong theme on load.

Dark mode is implemented by redefining the palette custom properties under
`:root[data-theme='dark']`, so ordinary rules need no changes. Only a handful
of places need an explicit dark override: where a token that is light in the
light theme is used as a foreground on an always-dark band (the footer and CTA
band), or as dark text on yellow. Those overrides sit together at the end of
`app/globals.css`.

### GitHub Pages and the base path

Project sites are served from a subpath (`https://<username>.github.io/<repo>/`),
so the deployed build needs a matching `basePath`. That is switched on by the
`GITHUB_PAGES=true` environment variable and is off in local development, which
is why local URLs have no prefix.

`next.config.ts` hardcodes the repository name for this prefix. **If the
repository is ever renamed, update `repo` in `next.config.ts` to match** or every
asset on the deployed site will 404.

Raw string paths are not prefixed automatically by Next, so anything of that
kind goes through `withBasePath()` / `stripBasePath()` in `lib/base-path.ts`.
Use those helpers rather than writing a literal leading-slash path.

## Branches

Two long-lived branches:

- **`main`** — production. Protected; changes arrive only by pull request.
  Every push here deploys.
- **`dev`** — integration. Both of us branch off `dev` for features and open
  pull requests back into `dev`.

Feature work: branch from `dev`, PR into `dev`. When `dev` is ready to ship,
open a pull request from `dev` into `main`.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages. It runs on:

- every push to `main`
- manual trigger (*Actions → Deploy to GitHub Pages → Run workflow*)

The published site is at <https://souhib-khalbous.github.io/daa-wa-zekaa/>.

Pushes to `dev` do not deploy. The workflow builds with `GITHUB_PAGES=true`,
reads the `NEXT_PUBLIC_*` repository variables, and uploads `out/` via
`actions/deploy-pages`.

A `.nojekyll` marker ships in `public/` (and is re-created in CI) because Pages
runs Jekyll by default, which strips directories beginning with `_` — including
the `_next/` folder holding all JS, CSS, and fonts.

## Notes

`vite.config.ts` and `.openai/` belong to a separate Codex/Cloudflare preview
path and are not used by the Pages build. `.openai/` is untracked, so
`vite.config.ts` is excluded from `tsconfig.json` to keep `npm run typecheck`
working on a fresh clone.
