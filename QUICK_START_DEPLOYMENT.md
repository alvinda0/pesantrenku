# ⚡ Quick Start - Deploy PesantrenKu

Panduan cepat untuk deploy project ke Railway dengan GitHub Actions.

## 🎯 Ringkasan Langkah

1. [Setup Git & GitHub](#1-setup-git--github) (5 menit)
2. [Setup Railway](#2-setup-railway) (10 menit)
3. [Setup CI/CD](#3-setup-cicd) (3 menit)
4. [Deploy!](#4-deploy) (1 menit)

---

## 1. Setup Git & GitHub

### Install Git
Download: https://git-scm.com/downloads

```bash
# Cek instalasi
git --version

# Konfigurasi
git config --global user.name "Nama Anda"
git config --global user.email "email@example.com"
```

### Push ke GitHub

```bash
# Di folder project (d:\PesantrenKu)
git init
git add .
git commit -m "Initial commit"

# Buat repository di github.com (new repository)
# Kemudian:
git remote add origin https://github.com/USERNAME/pesantrenku.git
git branch -M main
git push -u origin main
```

---

## 2. Setup Railway

### A. Buat Account
1. Buka https://railway.app/
2. Login dengan GitHub

### B. Buat Project
1. **New Project** → **Deploy from GitHub repo**
2. Pilih repository `pesantrenku`

### C. Setup Services

#### Backend Service:
- Rename: `backend`
- Root Directory: `backend`
- Start Command: `node server.js`

#### Frontend Service:
- **+ New** → **GitHub Repo** → pilih repo yang sama
- Rename: `frontend`
- Root Directory: `frontend`
- Start Command: `npm run preview -- --host 0.0.0.0 --port $PORT`

#### Database:
- **+ New** → **Database** → **MySQL**

### D. Environment Variables

#### Backend Variables:
```env
NODE_ENV=production
PORT=5000
DB_HOST=[dari Railway MySQL]
DB_PORT=[dari Railway MySQL]
DB_USER=[dari Railway MySQL]
DB_PASSWORD=[dari Railway MySQL]
DB_NAME=[dari Railway MySQL]
JWT_SECRET=your-secret-key-123456
JWT_EXPIRES_IN=7d
CORS_ORIGIN=[URL frontend Railway]
```

**Cara dapat DB credentials:**
Klik MySQL service → tab **Variables** → copy MYSQL_*

**Cara dapat Frontend URL:**
Frontend service → **Settings** → **Networking** → **Generate Domain**

#### Frontend Variables:
```env
VITE_API_URL=[URL backend Railway]/api
```

**Cara dapat Backend URL:**
Backend service → **Settings** → **Networking** → **Generate Domain**

### E. Import Database
MySQL service → **Data** → paste isi `backend/database/schema.sql`

---

## 3. Setup CI/CD

### A. Dapatkan Railway Token
1. Buka https://railway.app/account/tokens
2. **Create New Token** → copy token

### B. Setup GitHub Secret
1. Repository di GitHub → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**:
   - Name: `RAILWAY_TOKEN`
   - Secret: [paste token]
3. **Add secret**

---

## 4. Deploy!

```bash
# Push code ke GitHub
git add .
git commit -m "Setup CI/CD"
git push origin main
```

✅ **Done!** GitHub Actions akan otomatis deploy ke Railway.

---

## 📍 URL Penting

Setelah deploy, save URL berikut:

- **Frontend**: `https://your-frontend.up.railway.app`
- **Backend**: `https://your-backend.up.railway.app`
- **API Endpoint**: `https://your-backend.up.railway.app/api`

---

## 🔍 Cek Status Deploy

### GitHub Actions:
Repository → tab **Actions** → lihat workflow terakhir

### Railway:
Project → pilih service → tab **Deployments** → **View Logs**

---

## ⚠️ Troubleshooting Cepat

| Problem | Solution |
|---------|----------|
| Database connection error | Cek environment variables DB di Railway backend |
| CORS error | Update `CORS_ORIGIN` di backend dengan URL frontend |
| Build failed | Cek logs di GitHub Actions |
| 404 di frontend | Pastikan routing di nginx.conf sudah benar |
| Railway token invalid | Generate token baru, update GitHub secret |

---

## 📚 Dokumentasi Lengkap

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan detail.

---

## ✅ Checklist

- [ ] Git terinstall
- [ ] Repository di GitHub
- [ ] Railway account
- [ ] Backend service setup
- [ ] Frontend service setup
- [ ] MySQL database
- [ ] Environment variables backend
- [ ] Environment variables frontend
- [ ] Railway token di GitHub secrets
- [ ] Push code ke GitHub
- [ ] Cek GitHub Actions sukses
- [ ] Test URL frontend
- [ ] Test URL backend/api
- [ ] Test login aplikasi

---

Butuh bantuan? Baca [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap!
