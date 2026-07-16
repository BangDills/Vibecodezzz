# Product Requirement Document (PRD) — Vibefolio

> **Living document** — kept at the repo root for anyone joining the project.
> Last revision verified against current library docs (Next.js 16, Motion 12, Tailwind v4, Zod 4).

---

## 1. Executive Summary & Objective

- **Product Name**: **Vibefolio** — landing page portfolio interaktif dengan estetika "Apple-inspired" untuk komunitas *vibecoders*.
- **Problem Statement**: Banyak developer indie / *vibe-coders* memiliki karya menarik namun tidak punya halaman showcase yang cepat, ringan, dan meninggalkan impresi pertama yang kuat. Landing page berdesain premium biasanya butuh effort desain besar dan sulit dipersonalisasi.
- **Target Audience**:
  - **Vibe-coders** (developer / maker / kreator digital) berusia 18–35, aktif di GitHub, X, dan Product Hunt.
  - **Recruiter / Klien potensial** yang ingin ringkasan portofolio satu halaman yang menarik.
- **Value Proposition**: Landing page portofolio cepat, responsif, mobile-friendly, dengan animasi modern ala Apple — **tanpa backend**. Isi `data.json`, klik build, jadi.

---

## 2. User Personas & Use Cases

### Persona 1 — "Bima", Solo Indie Developer
Use case: pilih template "Apple Minimal", isi nama + bio + 3 proyek, klik publish → `bima.vibefolio.dev` dalam < 60 detik.

### Persona 2 — "Rara", AI / Prompt Engineer
Use case: pilih template "Hero Parallax", ubah hero copy jadi naratif, tambahkan timeline eksperimen, pakai animasi scroll-triggered per section.

### Persona 3 — "Hadi", Technical Recruiter
Use case: menerima link portofolio kandidat, membuka situs, memverifikasi micro-interactions sebagai indikator skill frontend.

---

## 3. Scope & MVP Features

### Phase 1 — MVP
1. Single-user static portfolio (no backend). Data via `data.json`.
2. Template **"Apple Minimal"** dengan dark premium theme.
3. **Hero Section** dengan animasi teks *split-letter reveal* + *word-by-word tagline*.
4. **Section daftar proyek** — kartu snap-rail (mobile) / grid 2 kolom (desktop) dengan hover effect.
5. **Section sosial / kontak** dengan tombol pill.
6. **Smooth scroll + reveal on scroll** via Motion `whileInView`.
7. **Mobile responsive** (iPhone SE → Pro Max).
8. **Deploy satu klik ke Vercel** atau download static `out/`.

### Phase 2 — Post-MVP
1. Multi-template (Hero Parallax, Bento Grid, Magazine).
2. In-browser CMS / drag-drop section editor.
3. Multi-user dengan Supabase + subdomain.
4. Light/dark toggle.
5. Privacy-friendly analytics.
6. OG image generator otomatis.
7. Integrasi GitHub API untuk auto-sync projects.

---

## 4. Functional Specifications

### Modul 1 — Konfigurasi Konten (Config Driven)
| Komponen | Spesifikasi |
|---|---|
| Format | `data.json` di root: `{ name, tagline, bio, theme, projects[], socials[] }` |
| Validasi | **Zod 4** schema — failure throws di build, error readable di terminal |
| Sumber | File lokal (MVP) → CMS (Post-MVP) |

### Modul 2 — Hero Section
- **Konten**: Nama besar + tagline animasi + bio.
- **Animasi Teks**:
  - **Split-letter reveal** — setiap karakter nama di-stagger via Motion `staggerChildren` + blur fade-in (durasi 0.6s, easing `[0.22, 1, 0.36, 1]`).
  - **Word-by-word tagline** — fade up berurutan setelah hero name selesai.
  - **Tagline typewriter** (opsional, post-MVP) — pakai komponen `Typewriter` 1.3kb bawaan Motion.
- **Aksesibilitas**: `useReducedMotion()` dari Motion — render statis instan saat user prefers-reduced-motion.

### Modul 3 — Project Showcase
- **Layout**:
  - **Mobile**: `<78% card-width>` di dalam `.snap-rail` horizontal scroll-snap.
  - **Desktop (md+)**: grid 2 kolom.
- **Komponen kartu**: judul, deskripsi 1–2 kalimat, tag stack chip, arrow → muncul saat hover.
- **Interaksi**: hover → `whileHover={{ y: -3, boxShadow: ... }}` (Apple-style lift + accent glow).

### Modul 4 — Socials & Footer
- Pill buttons dengan `whileHover={{ scale: 1.04 }}` dan `whileTap={{ scale: 0.97 }}`.
- Footer copyright + "Built with Vibefolio" link.

### Modul 5 — Theme Engine (Post-MVP)
- CSS variables via `@theme` Tailwind v4 (sudah dipakai sejak MVP sebagai single source of truth).
- Preset: Apple Dark, Apple Light, Midnight, Sunset.

### API Endpoints (Post-MVP — tidak relevan untuk static export)
> Saat MVP di-deploy sebagai static `out/`, route handlers tidak tersedia — API di fase CMS akan di-deploy sebagai function terpisah (Vercel Functions / Edge) atau layanan Supabase langsung.

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/users/:slug` | GET | Ambil data portofolio publik |
| `/api/users/:slug` | POST | Update isi (auth) |
| `/api/og` | GET | Generate OG image preview |

---

## 5. Non-Functional Specifications

- **Security**
  - MVP static-first: risiko minimal, HTTPS otomatis dari host (Vercel).
  - Post-MVP: JWT via Supabase, RLS di Postgres.
- **Performance**
  - **Lighthouse Performance ≥ 95** (target utama).
  - First Contentful Paint < 1.0s pada 4G.
  - JS bundle < 150 KB gzipped (Motion lazy-imports via `motion/react`).
  - Animasi off-screen dipasang via `whileInView` sehingga tidak ada main-thread work saat di luar viewport.
- **Availability & Compliance**
  - SLA 99.9% (hosting pilihan).
  - Privacy-first: tanpa cookie banner saat MVP (zero tracking).

---

## 6. Technical Stack Recommendations (Verified 2026-07)

> Setiap baris di bawah ini telah divalidasi terhadap dokumentasi resmi library saat penulisan PRD.

| Layer | Pilihan (Versi) | Alasan |
|---|---|---|
| Framework Frontend | **Next.js v16** (App Router) | SSG via `output: "export"` ke folder `out/` sangat cocok untuk MVP zero-backend; ekosistem Vercel-native. |
| UI base | **React 19** | Default di Next 16, kompatibel penuh dengan Motion 12. |
| Animasi | **Motion v12** *(penerus resmi Framer Motion, paket `motion`, import `motion/react`)* | API deklaratif untuk `whileInView`, `variants` + `staggerChildren`, `useReducedMotion`, `animate()` imperative. Standar industri untuk efek Apple-like. |
| Styling | **Tailwind CSS v4** (+ `@tailwindcss/postcss`) | CSS-first engine: `@theme` block menentukan design tokens via CSS variables — pondasi Theme Engine post-MVP. Tidak lagi butuh `tailwind.config.js` wajib. |
| Tipografi | System SF Pro via `-apple-system` (zero CLS, free) | Default paling cepat & paling "Apple". Bisa di-upgrade ke `next/font` Inter/Geist di post-MVP. |
| Hosting / Infra | **Vercel** (atau static host lain) | Deploy otomatis, CDN global, otomatis HTTPS. |
| Schema Validation | **Zod v4** | Validasi runtime + build-time, `z.toJSONSchema()`, `meta()`, performa tsc 100× lebih cepat dari Zod 3. |
| CMS (Post-MVP) | **Supabase (Postgres)** + RLS | Multi-user paling ringan di sisi client. |
| Analytics (Opsional) | Plausible / Vercel Analytics | Privacy-friendly, tanpa cookie banner. |

### Draft DB Schema (Post-MVP)

```
Table: users
  id          uuid PK
  slug        text UNIQUE INDEX
  name        text
  tagline     text
  bio         text
  theme       text DEFAULT 'apple-dark'
  created_at  timestamptz
  updated_at  timestamptz

Table: projects
  id          uuid PK
  user_id     uuid FK → users.id  (ON DELETE CASCADE)
  title       text
  description text
  url         text
  tags        text[]
  order_idx   int
  created_at  timestamptz

Table: socials
  id          uuid PK
  user_id     uuid FK → users.id
  kind        text  ('github' | 'x' | 'linkedin' | 'email' | 'website')
  url         text
  order_idx   int

Table: analytics_events (Opsional)
  id          bigserial PK
  user_id     uuid FK
  event_type  text
  referrer    text
  country     text
  occurred_at timestamptz
```

Relasi: `1 user → N projects`, `1 user → N socials`. Index utama: `users.slug`, `projects(user_id, order_idx)`.

---

## 7. Next Actions & Milestones

| # | Milestone | Deliverable | Status |
|---|---|---|---|
| 1 | **Project Bootstrap** | Repo Next.js 16 + Tailwind v4 + Motion 12 + Zod 4 ber-setup, dark Apple theme, hero split-letter animation jadi. | ✅ Done (Milestone ini dipenuhi oleh commit `Bootstrap Vibefolio MVP`) |
| 2 | **Templating Engine** | Layer config-driven (`data.json` + Zod) merender Hero, Projects, Socials. Smooth scroll & reveal aktif. | ✅ Done |
| 3 | **Mobile Polish** | Responsive QA di iPhone SE s/d Pro Max; Lighthouse ≥ 95; `prefers-reduced-motion` honored. | ⏳ Pending — Lighthouse belum diukur di CI |
| 4 | **Public Launch v1** | Deploy ke Vercel, README dipublikasi, komunitas vibecoders diajak coba via GitHub & X. | ⏳ Pending — siap deploy otomatis oleh Vercel |

---

> **Catatan untuk Founder**: MVP sengaja dirancang *zero-backend* demi kecepatan rilis dan shareability. Begitu traction awal terkumpul, CMS + multi-user (Supabase) akan menjadi batu loncatan berikutnya yang terendah risikonya.
