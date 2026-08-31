# Web Publik - Kelurahan Karbon Biru

Website publik untuk menampilkan informasi budidaya rumput laut dan karbon biru di Kelurahan Lembang, Kecamatan Bantaeng, Sulawesi Selatan.

## Fitur

- **Beranda** - Landing page informasi umum
- **Peta** - Peta interaktif lokasi budidaya dengan marker
- **Detail Lahan** - Informasi lengkap setiap lokasi budidaya
- **MRV** - Timeline dan dokumentasi MRV
- **Karbon** - Estimasi dan grafik karbon
- **Dokumen** - Repository dokumen terkait
- **Kontak** - Informasi kontak

## Teknologi

- React 19 + Vite
- React Router (HashRouter)
- Leaflet / React-Leaflet (peta)
- Recharts (grafik)
- Framer Motion (animasi)

## Instalasi

```bash
npm install
```

## Menjalankan Development

```bash
npm run dev
```

Buka `http://localhost:5173`

**PENTING:** Pastikan Backend API sudah berjalan di `http://localhost:3001`

## Build Production

```bash
npm run build
```

## Navigasi

```
Beranda | Peta | MRV | Karbon | Dokumen | Kontak
```

## Fitur Peta

1. Marker di peta menampilkan lokasi lahan dari database
2. Klik marker → Info singkat di panel samping
3. Tombol "Lihat Detail" → Halaman detail lahan lengkap

## Koneksi API

Web Publik menggunakan endpoint berikut:

- `GET /api/lahan` - Mengambil semua data lahan untuk peta
- `GET /api/lahan/:id` - Mengambil detail lahan untuk halaman detail

Web ini **TIDAK memiliki** fitur CRUD. Hanya menampilkan data (READ only).

## Deploy

Website ini dapat di-deploy ke GitHub Pages atau hosting statis lainnya.
