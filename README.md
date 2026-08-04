# Vibefolio ✦

Landing page portofolio minimalis. Cepat dibuka, mudah dikustomisasi, gratis di-

> **Cukup 5 menit — edit `config.json`, push ke GitHub, dan portofolio-mu langsung live.**

## Fitur

- **Single-page** — Semua konten dalam satu halaman, loading secepat kilat.
- **Config-driven** — Cukup edit `config.json`, tidak perlu menyentuh HTML/CSS/JS.
- **Dark theme** — Tema gelap Apple-inspired, nyaman di mata.
- **Animasi scroll ringan** — Efek fade-in + slide-up saat scroll menggunakan [Motion](https://motion.dev).
- **Responsive** — Menyesuaikan dari layar HP (320px) hingga desktop (1920px).
- **Tailwind CSS v4** — Utility-first CSS framework untuk styling cepat dan bersih.
- **Font Inter** — Font modern yang terbaca di semua ukuran layar.

## Cara Deploy (5 Langkah)

### 1. Clone repo
```bash
git clone https://github.com/BangDills/celiuzvibes.git
cd celiuzvibes
```

### 2. Edit `config.json`

Buka file `config.json` dan isi dengan data kamu:

```json
{
  "profile": {
    "name": "Nama Kamu",
    "role": "Frontend Developer",
    "bio": "Tulis bio singkat tentang dirimu.",
    "avatar": "assets/images/foto-kamu.jpg",
    "email": "email@kamu.com",
    "social": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      "x": "https://x.com/username"
    }
  },
  "projects": [
    {
      "title": "Nama Project",
      "description": "Deskripsi singkat project.",
      "image": "assets/images/thumbnail-project.jpg",
      "tags": ["Next.js", "Tailwind"],
      "links": {
        "live": "https://example.com",
        "github": "https://github.com/username/repo"
      }
    }
  ]
}
```

### 3. Ganti gambar
Masukkan foto profil dan thumbnail project ke folder `assets/images/`:

| File | Deskripsi | Ukuran Rekomendasi |
|------|-----------|-------------------|
| `assets/images/foto-profil.jpg` | Foto profil (bulat) | 200×200 px, max 100 KB |
| `assets/images/project-*.jpg` | Thumbnail project | 600×400 px, max 200 KB |

> **Tips kompresi gambar:** Gunakan [Squoosh](https://squoosh.app) atau [TinyPNG](https://tinypng.com) sebelum push.

### 4. Commit & push
```bash
git add .
git commit -m "feat: kustomisasi portofolio"
git push origin main
```

### 5. Aktifkan GitHub Pages
1. Buka repo di GitHub → **Settings** → **Pages**.
2. Pilih **Source**: `Deploy from a branch`.
3. Pilih **Branch**: `main`, folder: `/ (root)`.
4. Klik **Save**.
5. Tunggu 1-2 menit, portofolio-mu live di:
   `https://bangdills.github.io/celiuzvibes`

## Struktur Folder

```
celiuzvibes/
├── index.html          ← Halaman utama (jangan diedit langsung)
├── config.json         ← Data portofolio (edit di sini)
├── style.css           ← Kustom styling
├── script.js           ← Logika render & animasi
├── README.md           ← Panduan ini
└── assets/
    └── images/         ← Foto profil & thumbnail project
```

## Validasi Data

Saat halaman dimuat, Vibefolio otomatis memvalidasi `config.json`. Jika ada field yang salah atau kurang, error akan muncul di layar dan di konsol browser.

**Field wajib di `config.json`:**
- `profile.name` — Nama kamu
- `profile.email` — Alamat email
- `projects[].title` — Judul project
- `projects[].description` — Deskripsi project
- `projects[].image` — Path gambar project

## Catatan Teknis

- **Tidak ada database** — Semua data statis dari `config.json`.
- **Tidak ada backend** — Murni frontend, hosting di GitHub Pages.
- **Bundle size** — < 200 KB total (termasuk CSS, JS, font).
- **Motion** — CDN `motion@11.18.2` untuk animasi scroll.
- **Privasi** — Tidak ada tracking, cookie, atau penyimpanan data pengunjung.

## Lisensi

MIT — Bebas digunakan, dimodifikasi, dan disebarluaskan.

---

_Dibuat dengan ✦ oleh [Pinokioarab](https://github.com/BangDills)_
