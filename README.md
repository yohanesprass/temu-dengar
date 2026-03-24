# 🔊 Temu Dengar
### Collective Portfolio & Documentation Template

[Live Preview Website](https://yohanesprass.github.io/temu-dengar/)

**Temu Dengar** adalah template website portfolio modern yang dirancang khusus untuk dokumentasi acara musik, *live sessions*, atau kolektif kreatif. Fokus pada visual yang bersih, tipografi yang kuat, dan interaktivitas yang halus untuk menonjolkan konten audio-visual.

> Template ini merupakan hasil pengembangan dari kebutuhan nyata sebuah kolektif musik yang telah berjalan selama 3 tahun — sangat fungsional untuk keperluan arsip sekaligus branding profesional untuk mencari sponsor.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🖱️ **Custom Cursor** | Kursor kustom dengan efek *smooth trailing* dan animasi *hover* dinamis |
| 🖼️ **Dynamic Gallery** | Galeri yang merender data otomatis dari JSON/Object dengan filter kategori (Vol 1, 2, 3) |
| 🎬 **Multi-Format Lightbox** | Mendukung YouTube, SoundCloud, Instagram, Local Video, dan Image |
| 🔀 **SPA Navigation** | Perpindahan halaman (Home, Projects, Journal, Contact) dengan animasi *fade* tanpa reload |
| ⏱️ **Live Countdown** | Hitung mundur otomatis untuk menyambut event mendatang |
| 📊 **Stats Grid** | Tampilan data statistik (Years, Artists, Volumes) untuk menarik calon sponsor |
| 🤝 **Partners Archive** | Susunan logo sponsor per Volume untuk dokumentasi sejarah kolektif |
| 🎵 **Music Player Widget** | Widget minimalis *toggle* di pojok layar untuk playlist unggulan |

---

## 🚀 Tech Stack

- **HTML5** — Struktur semantik
- **CSS3** — Custom Properties, Grid, Flexbox, Media Queries
- **JavaScript ES6+** — Vanilla JS, tanpa framework
- **Font Awesome** — Icon library

> ✅ **100% No Framework** — Ringan, cepat, dan mudah dimodifikasi.

---

## 📁 Struktur Folder

```
temu-dengar/
├── index.html       # Struktur utama website
├── style.css        # Styling (Global, Layout, Grid, Media Queries)
├── script.js        # Logika utama (Kursor, Navigasi, Lightbox, Timer)
├── data.js          # Database konten — edit di sini untuk mengganti data
└── assets/          # Gambar, logo sponsor, dan video
```

---

## ⚙️ Cara Kustomisasi

### 1. Menambah / Mengubah Proyek

Buka `data.js` dan sesuaikan array `projects`:

```javascript
export const projects = [
    {
        title: "Judul Acara/Project",
        category: "Vol. 3",         // Harus sesuai dengan data-filter di HTML
        img: "assets/thumb.jpg",    // Thumbnail di galeri
        type: "youtube",            // Pilihan: youtube | soundcloud | instagram | local | image
        link: "ID_VIDEO",           // Lihat panduan atribut di bawah
        desc: "Deskripsi singkat tentang project ini."
    }
];
```

**Format atribut `type` & `link`:**

| `type` | Isi `link` dengan |
|---|---|
| `youtube` | ID Video saja — contoh: `dQw4w9WgXcQ` |
| `soundcloud` | URL lengkap track/playlist |
| `instagram` | URL lengkap postingan |
| `local` | Path file video — contoh: `assets/video.mp4` |
| `image` | Kosongkan (tidak perlu diisi) |

---

### 2. Mengatur Countdown Timer

Cari fungsi `initCountdown()` di `script.js` dan ubah tanggal target:

```javascript
const targetDate = new Date("April 18, 2026 19:00:00").getTime();
```

---

### 3. Mengubah Teks Typewriter

Cari variabel `phrases` di `script.js` untuk mengubah teks animasi mengetik di Hero Section:

```javascript
const phrases = [
    "Teks pertama yang akan diketik...",
    "Teks kedua...",
];
```

---

## 📜 Lisensi

Dirilis di bawah **[MIT License](LICENSE)**.

Kamu bebas untuk menggunakan, memodifikasi, dan mendistribusikan ulang template ini — selama tetap mencantumkan kredit penulis asli.

---

<div align="center">

Dibuat dengan dedikasi untuk ekosistem musik lokal oleh **[Yohanes](https://www.instagram.com/yohanes.prass/)** 🎶

</div>
