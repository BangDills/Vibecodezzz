# Vibefolio

An Apple-inspired, static-first portfolio for indie makers and **vibe-coders**.
Edit one `data.json` file → get a fast, accessible, beautifully animated personal site.

> Zero backend. Zero CMS. Just vibes.

## Features (MVP)

- **Split-letter hero reveal** powered by [Motion](https://motion.dev) (the rebrand of Framer Motion).
- **Scroll-triggered sections** with `whileInView` for lazy, off-screen optimization.
- **`prefers-reduced-motion`** respected automatically.
- **Config-driven content** validated by **Zod 4** at build time.
- **Tailwind CSS v4** with a CSS-first `@theme` design-token layer.
- **Next.js App Router** static-exported (`output: "export"`) — deploys as plain HTML/CSS/JS.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19 |
| Animation | Motion 12 (`motion/react`) |
| Styling | Tailwind CSS v4 |
| Validation | Zod 4 |
| Hosting | Vercel (or any static host) |

## Quick start

```bash
npm install
npm run validate        # validates data.json through Zod
npm run dev             # http://localhost:3000
npm run build           # generates ./out for static deploy
```

## Customise your portfolio

1. Edit `data.json` — change your `name`, `tagline`, `bio`, `projects[]`, and `socials[]`.
2. Run `npm run validate` to catch schema errors before building.
3. Run `npm run build` to produce the static bundle in `./out/`.
4. Drag the `out/` folder into any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

### `data.json` shape

```jsonc
{
  "name": "Your name",
  "tagline": "One-line signature",
  "bio": "A short paragraph.",
  "theme": "apple-dark",
  "projects": [
    {
      "title": "Project",
      "description": "Up to 280 chars.",
      "url": "https://...",
      "tags": ["Next.js", "TypeScript"]
    }
  ],
  "socials": [
    { "kind": "github", "url": "https://github.com/you", "label": "GitHub" }
  ]
}
```

Validation lives in `lib/schema.ts` — extend `PortfolioSchema` to add new fields.

## Project structure

```
.
├── app/
│   ├── globals.css         # Tailwind v4 + @theme tokens
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx            # Split-letter reveal + scroll fade
│   ├── Projects.tsx        # Snap rail (mobile) / 2-col grid (desktop)
│   ├── Socials.tsx         # Pill buttons with scale + ring hover
│   └── Footer.tsx
├── lib/
│   ├── schema.ts           # Zod 4 schema for data.json
│   └── load-data.ts        # Validated import boundary
├── scripts/
│   └── validate-data.ts    # CLI: `npm run validate`
├── data.json               # Your content (validated)
└── next.config.ts          # `output: "export"` for SSG
```

## Deployment to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel (no env vars needed).
3. Build command: `npm run build` · Output directory: `out`.

## Roadmap (post-MVP)

- Multi-template theme engine (Apple Light / Midnight / Sunset / Bento).
- In-browser CMS (Supabase) with multi-user slugs.
- OG image generator endpoint.
- GitHub integration to auto-pull latest repos.

## License

MIT — go build your vibe.
