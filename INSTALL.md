# Panduan Instalasi PesantrenKu

## Langkah-langkah Instalasi Lengkap

### 1. Persiapan

Pastikan sudah terinstall:
- Node.js v16+ ([Download](https://nodejs.org/))
- MySQL v8+ ([Download](https://dev.mysql.com/downloads/))
- Git (opsional)

### 2. Setup Database

**Windows (PowerShell/CMD):**
```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE pesantren_db;

# Keluar dari MySQL
exit;

# Import schema (dari folder backend)
cd backend
mysql -u root -p pesantren_db < database\schema.sql
```

**Verifikasi database sudah ter-create:**
```bash
mysql -u root -p pesantren_db -e "SHOW TABLES;"
```

Anda harus melihat tabel: users, tahfidz, jurnal_shalat, kehadiran, jenis_pelanggaran, pelanggaran

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy file .env.example
copy .env.example .env
```

**Edit file .env:**
```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql_anda
DB_NAME=pesantren_db
DB_PORT=3306

JWT_SECRET=ganti_dengan_random_string_panjang
JWT_EXPIRE=7d
```

**Generate JWT Secret (opsional - untuk keamanan lebih baik):**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Copy file .env.example
copy .env.example .env
```

**Edit file .env (jika perlu):**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Menjalankan Aplikasi

**Buka 2 terminal/command prompt:**

**Terminal 1 - Jalankan Backend:**
```bash
cd backend
npm run dev
```

Anda akan melihat:
```
✅ Database connected successfully
🚀 Server running on port 5000
📝 Environment: development
```

**Terminal 2 - Jalankan Frontend:**
```bash
cd frontend
npm run dev
```

Anda akan melihat:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 6. Akses Aplikasi

Buka browser dan akses: **http://localhost:5173**

**Login dengan akun default:**
- **Ustadz:** ahmad@pesantren.com / password123
- **Santri:** rizki@pesantren.com / password123

## Troubleshooting

### Error: Cannot find module
```bash
# Hapus folder node_modules dan install ulang
rm -rf node_modules
npm install
```

### Error: ECONNREFUSED (Database connection failed)
- Pastikan MySQL sudah running
- Cek username, password, dan nama database di .env
- Pastikan port MySQL sesuai (default 3306)

### Error: Port already in use
```bash
# Ganti port di .env (backend)
PORT=5001

# Atau kill process yang menggunakan port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Error: JWT Secret not defined
- Pastikan JWT_SECRET sudah diisi di file .env backend
- Restart backend server setelah edit .env

### Database table tidak ada
```bash
# Import ulang schema
cd backend
mysql -u root -p pesantren_db < database\schema.sql
```

### Frontend tidak bisa connect ke backend
- Pastikan backend sudah running di port 5000
- Cek VITE_API_BASE_URL di .env frontend
- Pastikan tidak ada CORS error (sudah handled di backend)

## Build untuk Production

### Backend Production
```bash
cd backend
npm start
```

### Frontend Production Build
```bash
cd frontend
npm run build

# File hasil build ada di folder dist/
# Deploy ke hosting static (Vercel, Netlify, dll)
```

## Konfigurasi Production

### Backend (.env production)
```
PORT=5000
NODE_ENV=production

DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=pesantren_db

JWT_SECRET=your_secure_random_string
JWT_EXPIRE=7d
```

### Frontend (.env production)
```
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## Update Aplikasi

```bash
# Pull update terbaru (jika menggunakan git)
git pull

# Update dependencies backend
cd backend
npm install

# Update dependencies frontend
cd ../frontend
npm install

# Restart aplikasi
```

## Backup Database

```bash
# Backup
mysqldump -u root -p pesantren_db > backup_pesantren_$(date +%Y%m%d).sql

# Restore
mysql -u root -p pesantren_db < backup_pesantren_20240821.sql
```

## Tips Penggunaan

1. **Jangan gunakan akun default di production** - Buat akun baru dan hapus akun default
2. **Ganti JWT_SECRET** - Gunakan string random yang kuat
3. **Backup database rutin** - Jadwalkan backup otomatis
4. **Monitor log** - Periksa log error secara berkala
5. **Update dependencies** - Jalankan `npm audit` untuk cek vulnerability

## Support

Jika mengalami masalah:
1. Periksa log error di terminal backend
2. Periksa console browser (F12) untuk error frontend
3. Pastikan semua dependencies terinstall dengan benar
4. Restart backend dan frontend
