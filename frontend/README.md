# PesantrenKu Frontend

Frontend aplikasi manajemen pesantren yang dibangun dengan React TypeScript, Vite, Tailwind CSS, dan Axios.

## Fitur

- 🔐 Autentikasi JWT
- 📖 Manajemen Tahfidz
- 🕌 Jurnal Shalat 5 Waktu
- 📚 Kehadiran Belajar Malam
- ⚠️ Catatan Pelanggaran
- 👥 Manajemen User
- 📊 Dashboard & Statistik

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Router** - Routing

## Prerequisites

- Node.js (v16 atau lebih tinggi)
- npm atau yarn

## Installation

1. Masuk ke folder frontend
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Copy file `.env.example` menjadi `.env`
```bash
copy .env.example .env
```

4. Sesuaikan konfigurasi API di `.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

5. Jalankan development server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Build untuk Production

```bash
npm run build
```

File production akan ada di folder `dist/`

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc
│   ├── components/      # Reusable components
│   │   ├── common/      # Common components (Button, Input, etc)
│   │   ├── layout/      # Layout components (Navbar, Sidebar, etc)
│   │   └── ...          # Feature-specific components
│   ├── config/          # Configuration files
│   │   └── api.ts       # Axios configuration
│   ├── context/         # React Context
│   │   └── AuthContext.tsx
│   ├── pages/           # Page components
│   │   ├── auth/        # Login, Register
│   │   ├── dashboard/   # Dashboard
│   │   ├── tahfidz/     # Tahfidz pages
│   │   ├── shalat/      # Jurnal Shalat pages
│   │   ├── kehadiran/   # Kehadiran pages
│   │   ├── pelanggaran/ # Pelanggaran pages
│   │   └── users/       # User management pages
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables example
├── .gitignore          # Git ignore file
├── index.html          # HTML template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Environment Variables

```
VITE_API_BASE_URL - Base URL for backend API
```

## Features by Role

### Santri
- Lihat data tahfidz pribadi
- Lihat jurnal shalat pribadi
- Lihat kehadiran pribadi
- Lihat pelanggaran pribadi
- Update profile

### Ustadz
- Semua fitur Santri
- Tambah/edit/hapus data tahfidz
- Tambah/edit jurnal shalat
- Tambah/edit kehadiran
- Tambah/edit/hapus pelanggaran
- Lihat laporan harian
- Manajemen user (CRUD)
- Lihat statistik lengkap
