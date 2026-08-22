-- Create database
CREATE DATABASE IF NOT EXISTS pesantrenku;
USE pesantrenku;

-- Table: roles (master data roles)
CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  nama VARCHAR(50) UNIQUE NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_uuid (uuid),
  INDEX idx_nama (nama)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default roles
INSERT INTO roles (uuid, nama, deskripsi) VALUES
(UUID(), 'santri', 'Santri yang belajar di pesantren'),
(UUID(), 'pengajar', 'Pengajar atau ustadz di pesantren');

-- Table: users (santri dan pengajar)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  nis VARCHAR(50) UNIQUE,
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE,
  jenis_kelamin ENUM('laki-laki', 'perempuan'),
  alamat TEXT,
  no_telp VARCHAR(20),
  foto_profile VARCHAR(255),
  status ENUM('aktif', 'nonaktif', 'alumni') DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
  INDEX idx_uuid (uuid),
  INDEX idx_role (role_id),
  INDEX idx_status (status),
  INDEX idx_nis (nis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: tahfidz (pencatatan hafalan Al-Quran)
CREATE TABLE IF NOT EXISTS tahfidz (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  santri_id INT NOT NULL,
  pengajar_id INT NOT NULL,
  jenis ENUM('setoran_baru', 'muraja_ah') NOT NULL,
  surah VARCHAR(50) NOT NULL,
  juz INT,
  halaman INT,
  ayat_dari INT,
  ayat_sampai INT,
  tanggal DATE NOT NULL,
  waktu TIME NOT NULL,
  nilai ENUM('A', 'B', 'C', 'D') DEFAULT 'C',
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (santri_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pengajar_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_uuid (uuid),
  INDEX idx_santri (santri_id),
  INDEX idx_tanggal (tanggal),
  INDEX idx_jenis (jenis)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: jurnal_shalat (pencatatan shalat 5 waktu)
CREATE TABLE IF NOT EXISTS jurnal_shalat (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  santri_id INT NOT NULL,
  tanggal DATE NOT NULL,
  subuh ENUM('hadir', 'tidak_hadir', 'terlambat') DEFAULT 'tidak_hadir',
  dzuhur ENUM('hadir', 'tidak_hadir', 'terlambat') DEFAULT 'tidak_hadir',
  ashar ENUM('hadir', 'tidak_hadir', 'terlambat') DEFAULT 'tidak_hadir',
  maghrib ENUM('hadir', 'tidak_hadir', 'terlambat') DEFAULT 'tidak_hadir',
  isya ENUM('hadir', 'tidak_hadir', 'terlambat') DEFAULT 'tidak_hadir',
  keterangan TEXT,
  dicatat_oleh INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (santri_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dicatat_oleh) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE KEY unique_santri_tanggal (santri_id, tanggal),
  INDEX idx_uuid (uuid),
  INDEX idx_tanggal (tanggal),
  INDEX idx_santri (santri_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: kehadiran (kehadiran belajar malam)
CREATE TABLE IF NOT EXISTS kehadiran (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  tanggal DATE NOT NULL,
  waktu_masuk TIME,
  waktu_keluar TIME,
  status ENUM('hadir', 'izin', 'sakit', 'alpha') NOT NULL,
  lokasi VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  foto_kehadiran VARCHAR(255),
  keterangan TEXT,
  dicatat_oleh INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dicatat_oleh) REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE KEY unique_user_tanggal (user_id, tanggal),
  INDEX idx_uuid (uuid),
  INDEX idx_tanggal (tanggal),
  INDEX idx_user (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: jenis_pelanggaran (master data jenis pelanggaran)
CREATE TABLE IF NOT EXISTS jenis_pelanggaran (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  tingkat ENUM('ringan', 'sedang', 'berat') NOT NULL,
  poin INT DEFAULT 0,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_uuid (uuid),
  INDEX idx_tingkat (tingkat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: pelanggaran (catatan pelanggaran santri)
CREATE TABLE IF NOT EXISTS pelanggaran (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL,
  santri_id INT NOT NULL,
  jenis_pelanggaran_id INT NOT NULL,
  tanggal DATE NOT NULL,
  waktu TIME NOT NULL,
  lokasi VARCHAR(100),
  kronologi TEXT NOT NULL,
  sanksi TEXT,
  status ENUM('proses', 'selesai', 'banding') DEFAULT 'proses',
  dicatat_oleh INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (santri_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (jenis_pelanggaran_id) REFERENCES jenis_pelanggaran(id) ON DELETE CASCADE,
  FOREIGN KEY (dicatat_oleh) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_uuid (uuid),
  INDEX idx_santri (santri_id),
  INDEX idx_tanggal (tanggal),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default jenis pelanggaran with UUID
INSERT INTO jenis_pelanggaran (uuid, nama, tingkat, poin, deskripsi) VALUES
(UUID(), 'Terlambat Shalat Berjamaah', 'ringan', 5, 'Terlambat mengikuti shalat berjamaah'),
(UUID(), 'Tidak Mengikuti Belajar Malam', 'sedang', 10, 'Tidak hadir dalam kegiatan belajar malam tanpa izin'),
(UUID(), 'Keluar Tanpa Izin', 'sedang', 15, 'Keluar dari area pesantren tanpa izin pengurus'),
(UUID(), 'Berbicara Kasar', 'sedang', 10, 'Menggunakan kata-kata kasar atau tidak sopan'),
(UUID(), 'Berkelahi', 'berat', 25, 'Terlibat perkelahian dengan santri lain'),
(UUID(), 'Merokok', 'berat', 30, 'Kedapatan merokok di lingkungan pesantren'),
(UUID(), 'Merusak Fasilitas', 'berat', 20, 'Merusak atau menghilangkan fasilitas pesantren'),
(UUID(), 'Tidak Mengikuti Setoran Tahfidz', 'ringan', 5, 'Tidak mengikuti jadwal setoran hafalan tanpa izin');

-- Insert default users (1 pengajar dan beberapa santri untuk testing)
-- Password default: password123 (sudah di-hash dengan bcrypt)
INSERT INTO users (uuid, nama, email, password, role_id, nis, jenis_kelamin, status) VALUES
(UUID(), 'Ustadz Ahmad', 'ahmad@pesantren.com', '$2b$10$rQ5Z9Iy9WvXQKZ6qYXwzB.VfJtHvZ9xN8y7L6KQz8z9KZ6qYXwzB.', (SELECT id FROM roles WHERE nama = 'pengajar'), 'PGJ001', 'laki-laki', 'aktif'),
(UUID(), 'Muhammad Rizki', 'rizki@pesantren.com', '$2b$10$rQ5Z9Iy9WvXQKZ6qYXwzB.VfJtHvZ9xN8y7L6KQz8z9KZ6qYXwzB.', (SELECT id FROM roles WHERE nama = 'santri'), 'SNT001', 'laki-laki', 'aktif'),
(UUID(), 'Ahmad Fadli', 'fadli@pesantren.com', '$2b$10$rQ5Z9Iy9WvXQKZ6qYXwzB.VfJtHvZ9xN8y7L6KQz8z9KZ6qYXwzB.', (SELECT id FROM roles WHERE nama = 'santri'), 'SNT002', 'laki-laki', 'aktif'),
(UUID(), 'Fatimah Azzahra', 'fatimah@pesantren.com', '$2b$10$rQ5Z9Iy9WvXQKZ6qYXwzB.VfJtHvZ9xN8y7L6KQz8z9KZ6qYXwzB.', (SELECT id FROM roles WHERE nama = 'santri'), 'SNT003', 'perempuan', 'aktif');
