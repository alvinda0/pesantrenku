# PesantrenKu Backend API

Backend API untuk aplikasi manajemen pesantren yang dibangun dengan Node.js, Express.js, dan MySQL.

## Fitur

- 🔐 Autentikasi JWT + bcrypt
- 📖 Pencatatan Tahfidz
- 🕌 Jurnal Shalat 5 Waktu
- 📚 Jurnal Kehadiran Belajar Malam
- ⚠️ Catatan Pelanggaran
- 👥 Manajemen User (Santri & Ustadz)

## Prerequisites

- Node.js (v16 atau lebih tinggi)
- MySQL (v8 atau lebih tinggi)
- npm atau yarn

## Installation

1. Clone repository dan masuk ke folder backend
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Copy file `.env.example` menjadi `.env` dan sesuaikan konfigurasi
```bash
copy .env.example .env
```

4. Buat database MySQL
```sql
CREATE DATABASE pesantren_db;
```

5. Import schema database (akan dibuat di step berikutnya)
```bash
mysql -u root -p pesantren_db < database/schema.sql
```

6. Jalankan server
```bash
# Development mode dengan auto-reload
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Tahfidz
- `GET /api/tahfidz` - Get semua catatan tahfidz
- `POST /api/tahfidz` - Tambah catatan tahfidz
- `GET /api/tahfidz/:id` - Get detail catatan
- `PUT /api/tahfidz/:id` - Update catatan
- `DELETE /api/tahfidz/:id` - Hapus catatan

### Jurnal Shalat
- `GET /api/shalat` - Get jurnal shalat
- `POST /api/shalat` - Tambah jurnal shalat
- `GET /api/shalat/:id` - Get detail jurnal
- `PUT /api/shalat/:id` - Update jurnal

### Kehadiran
- `GET /api/kehadiran` - Get daftar kehadiran
- `POST /api/kehadiran` - Catat kehadiran
- `GET /api/kehadiran/:id` - Get detail kehadiran
- `PUT /api/kehadiran/:id` - Update kehadiran

### Pelanggaran
- `GET /api/pelanggaran` - Get daftar pelanggaran
- `POST /api/pelanggaran` - Tambah pelanggaran
- `GET /api/pelanggaran/:id` - Get detail pelanggaran
- `PUT /api/pelanggaran/:id` - Update pelanggaran
- `DELETE /api/pelanggaran/:id` - Hapus pelanggaran

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── errorHandler.js      # Error handling middleware
├── models/                  # Database models
├── routes/                  # API routes
├── controllers/             # Route controllers
├── utils/                   # Utility functions
├── database/
│   └── schema.sql           # Database schema
├── .env.example             # Environment variables example
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md               # Documentation
```

## Environment Variables

```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pesantren_db
DB_PORT=3306

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

## Technologies

- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **express-validator** - Input validation
