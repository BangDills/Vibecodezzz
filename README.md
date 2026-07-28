# Vibefolio — Landing Page Portofolio Minimalis

Landing page portofolio satu halaman dengan tema gelap, animasi scroll ringan, dan kustomisasi via JSON.

**[Lihat Demo](https://bangdills.github.io/Vibecodezzz)**

---

## Fitur

- **Hero Section** — Nama, foto profil, bio, dan tautan sosial media
- **Gallery Project Grid** — Responsif 1/2/3 kolom, dengan tag, deskripsi, dan tautan
- **Dark Mode** — Tema gelap default ala Apple
- **Animasi Scroll** — Fade-in + slide-up menggunakan [Motion](https://motion.dev/) v11.18.2
- **Validasi Konfigurasi** — Pengecekan struktur data saat runtime
- **Fully Responsive** — Dari layar 320px hingga 1920px

---

## Cara Pakai (5 Langkah)

### 1. Fork atau Clone Repo

```bash
git clone https://github.com/BangDills/Vibecodezzz.git
cd Vibecodezzz
```

### 2. Edit `config.json`

Buka file `config.json` dan ubah data sesuai profil kamu:

| Field | Contoh | Keterangan |
|-------|--------|------------|
| `profile.name` | `"Pinokioarab"` | Nama lengkap |
| `profile.role` | `"Frontend Developer"` | Posisi/keahlian |
| `profile.bio` | `"Membangun produk digital..."` | Bio singkat (1 kalimat) |
| `profile.email` | `"hi@pinokioarab.dev"` | Email kontak |
| `profile.avatar` | `"assets/images/foto.jpg"` | Path ke foto profil |
| `profile.social` | `{...}` | URL sosial media |
| `projects` | `[...]` | Array project portofolio |

> **Tips Gambar**: Kompres dulu pakai [Squoosh](https://squoosh.app/) atau [TinyPNG](https://tinypng.com/). Ukuran maksimal 200KB per gambar.

### 3. Ganti Gambar

Taruh foto profil dan gambar project di folder `assets/images/`.

Format yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`

### 4. Commit & Push

```bash
git add .
git commit -m "feat: kustomisasi portofolio"
git push origin main
```

### 5. Aktifkan GitHub Pages

1. Buka repo kamu di GitHub → **Settings** → **Pages**
2. Pilih **Source**: `Deploy from a branch`
3. Pilih **Branch**: `main` → folder `/ (root)`
4. Klik **Save**
5. Tunggu 1-2 menit, portofolio kamu live di:
   `https://<username>.github.io/<repo-name>`

---

## Struktur Project

```
vibefolio/
├── index.html          # Halaman utama
├── config.json           # Data portofolio (yang perlu kamu edit)
├── style.css            # Kustom styling
├── script.js            # Logic render + animasi
├── assets/
│   └── images/
│       ├── placeholder-avatar.svg
│       └── placeholder-project.svg
└── README.md            # Panduan ini
```

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Struktur | HTML5 semantik |
| Styling | Tailwind CSS v4 (CDN) |
| Animasi | Motion v11.18.2 |
| Validasi | Zod 4 |
| Font | Inter (Google Fonts) |
| Hosting | GitHub Pages |

---

## Kustomisasi Lanjutan

### Mengubah Warna

Buka `style.css` — semua kelas Tailwind bisa ditimpa. Tema gelap default ada di class `bg-zinc-950` di `<body>`.

### Menambah/Mengurangi Project

Edit array `projects` di `config.json`. Format:

```json
{
  "title": "Nama Project",
  "description": "Deskripsi singkat",
  "image": "assets/images/project.jpg",
  "tags": ["React", "Node.js"],
  "links": {
    "live": "https://...",
    "github": "https://..."
  }
}
```

> `links.live` bersifat opsional. Jika tidak ada, tombol Live Demo tidak akan muncul.

---

## Performa

- **FCP**: < 1,5 detik
- **Bundle**: < 200 KB (gzip)
- **Lighthouse**: Target ≥ 92

---

## Lisensi

MIT — Bebas pakai, modifikasi, dan distribusi.

---

Dibangun dengan ♡ oleh [Pinokioarab](https://github.com/BangDills)
