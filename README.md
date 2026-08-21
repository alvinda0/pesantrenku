# PesantrenKu - Sistem Manajemen Pesantren

Aplikasi manajemen pesantren modern yang dibangun dengan **Node.js (Express)**, **React TypeScript**, **MySQL**, dan **Tailwind CSS**.

## 📋 Fitur Utama

- 🔐 **Autentikasi JWT** - Login & Register dengan JWT Token
- 📖 **Manajemen Tahfidz** - Pencatatan setoran hafalan & muraja'ah
- 🕌 **Jurnal Shalat** - Monitoring shalat 5 waktu berjamaah
- 📚 **Kehadiran Belajar Malam** - Absensi santri & ustadz
- ⚠️ **Catatan Pelanggaran** - Pencatatan & monitoring pelanggaran
- 👥 **Manajemen User** - CRUD santri & ustadz (khusus ustadz)
- 📊 **Dashboard & Statistik** - Visualisasi data lengkap

## 🛠️ Tech Stack

### Backend
- **Node.js** v16+
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Routing

## 📦 Instalasi

### Prerequisites
- Node.js v16 atau lebih tinggi
- MySQL v8 atau lebih tinggi
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd PesantrenKu
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy .env.example ke .env
copy .env.example .env

# Edit .env dan sesuaikan konfigurasi database
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=pesantren_db
# JWT_SECRET=your_secret_key
```

### 3. Setup Database

```bash
# Buat database
mysql -u root -p
CREATE DATABASE pesantren_db;
exit;

# Import schema
mysql -u root -p pesantren_db < database/schema.sql
```

### 4. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Copy .env.example ke .env
copy .env.example .env

# Edit .env jika diperlukan
# VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Menjalankan Aplikasi

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend akan berjalan di `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# File production ada di folder dist/
```

## 👤 Default Users

Aplikasi sudah dilengkapi dengan beberapa user default untuk testing:

| Role | Email | Password | Nama |
|------|-------|----------|------|
| Ustadz | ahmad@pesantren.com | password123 | Ustadz Ahmad |
| Santri | rizki@pesantren.com | password123 | Muhammad Rizki |
| Santri | fadli@pesantren.com | password123 | Ahmad Fadli |
| Santri | fatimah@pesantren.com | password123 | Fatimah Azzahra |

## 📚 Struktur Project

```
PesantrenKu/
├── backend/                 # Backend API
│   ├── config/             # Konfigurasi database
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   ├── database/          # SQL schema
│   ├── .env.example       # Environment variables template
│   ├── server.js          # Main server file
│   └── package.json       # Dependencies
│
├── frontend/               # Frontend React App
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── common/    # Reusable components
│   │   │   └── layout/    # Layout components
│   │   ├── config/        # Configuration
│   │   ├── context/       # React Context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Entry point
│   ├── .env.example       # Environment variables template
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json       # Dependencies
│
└── README.md              # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Ubah password

### Tahfidz
- `GET /api/tahfidz` - Get semua data tahfidz
- `GET /api/tahfidz/:id` - Get detail tahfidz
- `POST /api/tahfidz` - Tambah data tahfidz (Ustadz only)
- `PUT /api/tahfidz/:id` - Update tahfidz (Ustadz only)
- `DELETE /api/tahfidz/:id` - Hapus tahfidz (Ustadz only)
- `GET /api/tahfidz/stats/:santri_id` - Get statistik

### Jurnal Shalat
- `GET /api/shalat` - Get semua jurnal shalat
- `GET /api/shalat/:id` - Get detail jurnal
- `POST /api/shalat` - Tambah/Update jurnal (Ustadz only)
- `PUT /api/shalat/:id` - Update jurnal (Ustadz only)
- `GET /api/shalat/stats/:santri_id` - Get statistik
- `GET /api/shalat/report/daily` - Get laporan harian (Ustadz only)

### Kehadiran
- `GET /api/kehadiran` - Get semua kehadiran
- `GET /api/kehadiran/:id` - Get detail kehadiran
- `POST /api/kehadiran` - Catat kehadiran (Ustadz only)
- `PUT /api/kehadiran/:id` - Update kehadiran (Ustadz only)
- `DELETE /api/kehadiran/:id` - Hapus kehadiran (Ustadz only)
- `GET /api/kehadiran/stats/:user_id` - Get statistik
- `GET /api/kehadiran/report/daily` - Get laporan harian (Ustadz only)

### Pelanggaran
- `GET /api/pelanggaran` - Get semua pelanggaran
- `GET /api/pelanggaran/:id` - Get detail pelanggaran
- `POST /api/pelanggaran` - Tambah pelanggaran (Ustadz only)
- `PUT /api/pelanggaran/:id` - Update pelanggaran (Ustadz only)
- `DELETE /api/pelanggaran/:id` - Hapus pelanggaran (Ustadz only)
- `GET /api/pelanggaran/stats/:santri_id` - Get statistik
- `GET /api/pelanggaran/jenis` - Get jenis pelanggaran

### Users
- `GET /api/users` - Get semua user (Ustadz only)
- `GET /api/users/:id` - Get detail user
- `PUT /api/users/:id` - Update user (Ustadz only)
- `DELETE /api/users/:id` - Hapus user (Ustadz only)
- `GET /api/users/stats/summary` - Get statistik (Ustadz only)

## 🔒 Authorization

Aplikasi menggunakan 2 role:

### Santri
- Lihat data pribadi (tahfidz, shalat, kehadiran, pelanggaran)
- Update profile pribadi
- Tidak dapat menambah/edit/hapus data

### Ustadz
- Semua akses Santri
- Tambah/edit/hapus semua data
- Lihat data semua santri
- Akses laporan dan statistik
- Manajemen user (CRUD)

## 🎯 Fitur Unggulan

1. **Role-based Access Control** - Pembatasan akses berdasarkan role
2. **Responsive Design** - Tampilan optimal di desktop & mobile
3. **Real-time Validation** - Validasi input di frontend & backend
4. **Secure Authentication** - JWT token dengan bcrypt password hashing
5. **RESTful API** - API yang terstruktur dengan baik
6. **TypeScript** - Type safety untuk mengurangi bug
7. **Modern UI** - Tampilan modern dengan Tailwind CSS

## 📝 Catatan Pengembangan

- Password di-hash menggunakan bcrypt dengan salt 10 rounds
- JWT token expire dalam 7 hari (konfigurasi di .env)
- Semua endpoint protected kecuali login & register
- Input validation menggunakan express-validator
- Error handling yang comprehensive

## 🤝 Kontribusi

Aplikasi ini dibuat untuk keperluan manajemen pesantren. Silakan fork dan modifikasi sesuai kebutuhan.

## 📄 License

ISC

## 🚀 Deployment

Aplikasi ini sudah dilengkapi dengan CI/CD menggunakan GitHub Actions dan Railway.

### Quick Start Deployment
Lihat [QUICK_START_DEPLOYMENT.md](./QUICK_START_DEPLOYMENT.md) untuk panduan cepat deploy.

### Dokumentasi Lengkap
Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan deployment lengkap.

### Fitur CI/CD:
- ✅ Automated testing
- ✅ Auto deploy ke Railway
- ✅ Separate backend & frontend services
- ✅ Database provisioning
- ✅ Environment variables management

---

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk pengelolaan pesantren yang lebih baik.
