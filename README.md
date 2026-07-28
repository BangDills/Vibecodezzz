# Vibefolio — Landing Page Portofolio Minimalis

Landing page portofolio satu halaman ala Apple — cepat, estetik, dan dikustomisasi lewat satu file JSON.

**[Lihat Demo](https://bangdills.github.io/Vibecodezzz)**

> Zero backend. Zero CMS. Just vibes.

---

## Fitur (MVP)

- **Split-letter hero reveal** — animasi per-karakter dengan [Motion](https://motion.dev) v12
- **Scroll-triggered sections** — `whileInView` untuk lazy reveal
- **`prefers-reduced-motion`** — dihormati secara otomatis
- **Config-driven content** — divalidasi **Zod 4** saat build
- **Tailwind CSS v4** — CSS-first `@theme` design tokens
- **Next.js App Router** — static export (`output: "export"`)
- **Responsive** — 1 kolom (mobile) / 2 kolom (desktop) untuk project
- **Tema gelap** — Apple-inspired dark theme dengan aksen biru

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19 |
| Animation | Motion 12 (`motion/react`) |
| Styling | Tailwind CSS v4 |
| Validation | Zod 4 |
| Font | Inter (self-hosted via `next/font`) |
| Hosting | GitHub Pages / Vercel |

## Quick Start

```bash
npm install
npm run validate        # validasi data.json lewat Zod
npm run dev             # http://localhost:3000
npm run build           # generate ./out untuk static deploy
```

## Kustomisasi Portofolio

### 1. Edit `data.json`

| Field | Contoh | Keterangan |
|-------|--------|------------|
| `name` | `"Pinokioarab"` | Nama lengkap |
| `tagline` | `"Membangun produk digital..."` | Slogan satu baris |
| `bio` | `"Frontend Developer..."` | Bio singkat (max 400 char) |
| `projects[]` | `[...]` | Array project portofolio |
| `socials[]` | `[...]` | Array tautan sosial |

### 2. Validasi

```bash
npm run validate
```

### 3. Build & Deploy

```bash
npm run build
# Hasil static ada di folder ./out/
```

### 4. Deploy ke GitHub Pages

1. Push repo ke GitHub
2. Buka **Settings → Pages**
3. Pilih **Branch**: `main` → folder `/docs` (copy isi `out/` ke `docs/`)
4. Atau gunakan GitHub Action untuk auto-deploy dari `out/`

### Format project di `data.json`

```jsonc
{
  "title": "Nama Project",
  "description": "Deskripsi singkat (max 280 char).",
  "url": "https://github.com/BangDills/...",
  "tags": ["Next.js", "TypeScript"]
}
```

### Format sosial di `data.json`

```jsonc
{ "kind": "github", "url": "https://github.com/...", "label": "GitHub" }
```

Supported kinds: `github`, `x`, `linkedin`, `email`, `website`

## Project structure

```
.
├── app/
│   ├── globals.css         # Tailwind v4 + @theme tokens
│   ├── layout.tsx          # Root layout + Inter font + FOUC safety
│   └── page.tsx            # Halaman utama SSG
├── components/
│   ├── Hero.tsx            # Split-letter reveal + scroll fade
│   ├── Projects.tsx        # Snap rail (mobile) / 2-col grid (desktop)
│   ├── Socials.tsx         # Pill buttons with scale + ring hover
│   └── Footer.tsx
├── lib/
│   ├── schema.ts           # Zod 4 schema untuk data.json
│   └── load-data.ts        # Validated import boundary
├── scripts/
│   └── validate-data.ts    # CLI: `npm run validate`
├── data.json               # Konten portofolio (validated)
├── assets/
│   └── images/             # Placeholder images
└── next.config.ts          # `output: "export"` untuk SSG
```

## Performa

- **FCP**: < 1,5 detik
- **Bundle**: < 100 KB (gzip, tanpa gambar)
- **Lighthouse**: Target ≥ 95

## Proyek Portofolio Saat Ini

| Project | Deskripsi | Link |
|---------|-----------|------|
| **FutsalKita** | Platform booking lapangan futsal dengan pembayaran digital | [Demo](https://bangdills.github.io/Vibecodezzz) |
| **Celiuz-Vault** | Manajemen vault digital dengan enkripsi end-to-end | [GitHub](https://github.com/BangDills/Celiuz-Vault) |
| **Social Notif** | Sistem notifikasi real-time multi-platform | [GitHub](https://github.com/BangDills/social-notif) |
| **Affiliate Content Lab** | Otomatisasi konten afiliasi berbasis AI | [GitHub](https://github.com/BangDills/affiliate-content-lab) |
| **Prompt Extractor** | Chrome extension untuk manajemen prompt AI | [GitHub](https://github.com/BangDills/prompt-extractor) |
| **Celiuz Bootstrap** | Starter kit TypeScript modern zero-boilerplate | [GitHub](https://github.com/BangDills/celiuz-bootstrap) |

## Roadmap (post-MVP)

- Multi-template theme engine (Apple Light / Midnight / Sunset / Bento)
- In-browser CMS (Supabase)
- OG image generator
- GitHub auto-sync repos
- Proyek images upload via UI

## Lisensi

MIT — bangun vibemu sendiri.
