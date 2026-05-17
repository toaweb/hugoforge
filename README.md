# hugo://forge

Professional Hugo migration service website.

## Stack

- **Hugo Extended** — static site generator
- **Tailwind CSS v4** — utility-first CSS via Hugo's `css.TailwindCSS` pipe (CSS-first config in `@theme`)
- **i18n** — Norwegian (default) at `/`, English at `/en/`, with hreflang
- **SEO** — Open Graph, Twitter Card, JSON-LD (Organization, WebSite, Service), sitemap, robots.txt
- **Cloudflare Pages** — hosting + global CDN
- **GitHub Actions** — CI/CD

## Development

```bash
pnpm install
pnpm dev                 # hugo server -D on :1313
```

Open <http://localhost:1313> (Norwegian) or <http://localhost:1313/en/> (English).

## Production build

```bash
pnpm build               # hugo --gc --minify → public/
```

## Regenerating branded assets

The OG image and favicons are rendered from SVG sources in `assets/svg/`:

```bash
pnpm assets              # bash scripts/generate-assets.sh
```

Outputs land in `static/`: `og-image.png` (1200×630), `favicon-32x32.png`, `apple-touch-icon.png` (180×180), `favicon.ico`.

## Deployment

Automatic on push to `main`:

1. GitHub Actions builds with Hugo Extended (`.github/workflows/deploy.yml`)
2. Artifact `public/` is deployed to Cloudflare Pages via `wrangler-action`
3. Custom domain: <https://hugoforge.toaweb.com>

PRs targeting `main` get preview deploys at `https://<branch>.hugoforge.pages.dev`.

### Required GitHub secrets

| Secret | Purpose |
| --- | --- |
| `CF_API_TOKEN` | Cloudflare API token with **Edit Cloudflare Workers** permission |
| `CF_ACCOUNT_ID` | Cloudflare account ID (Workers & Pages → right sidebar) |

## Project layout

```
.
├── assets/
│   ├── css/main.css            # Tailwind entry (@theme tokens)
│   └── svg/                    # OG + favicon SVG sources
├── content/
│   ├── no/_index.md            # Norwegian content
│   └── en/_index.md            # English content
├── i18n/
│   ├── no.toml                 # Norwegian translations
│   └── en.toml                 # English translations
├── layouts/
│   └── _default/robots.txt     # robots.txt template
├── scripts/
│   ├── generate-assets.sh
│   └── generate-assets.js
├── static/                     # favicons, og-image (generated)
└── themes/forge/layouts/       # baseof, home, _partials/*
```
