// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  status: number;
  timestamp: string;
  data: T;
  errors?: any[];
  metadata?: PaginationMetadata;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

// User types
export interface User {
  id: number;
  uuid: string;
  nama: string;
  email: string;
  role: 'santri' | 'pengajar';
  nis?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: 'laki-laki' | 'perempuan';
  alamat?: string;
  no_telp?: string;
  foto_profile?: string;
  status: 'aktif' | 'nonaktif' | 'alumni';
  created_at: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nama: string;
  email: string;
  password: string;
  role: 'santri' | 'pengajar';
  nis?: string;
  jenis_kelamin?: 'laki-laki' | 'perempuan';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Tahfidz types
export interface Tahfidz {
  id: number;
  uuid: string;
  santri_id: number;
  pengajar_id: number;
  jenis: 'setoran_baru' | 'muraja_ah';
  surah: string;
  juz?: number;
  halaman?: number;
  ayat_dari?: number;
  ayat_sampai?: number;
  tanggal: string;
  waktu: string;
  nilai: 'A' | 'B' | 'C' | 'D';
  keterangan?: string;
  santri_nama?: string;
  santri_nis?: string;
  pengajar_nama?: string;
  created_at: string;
}

export interface TahfidzStats {
  total_setoran: number;
  setoran_baru: number;
  muraja_ah: number;
  nilai_a: number;
  nilai_b: number;
}

// Jurnal Shalat types
export type ShalatStatus = 'hadir' | 'tidak_hadir' | 'terlambat';

export interface JurnalShalat {
  id: number;
  uuid: string;
  santri_id: number;
  tanggal: string;
  subuh: ShalatStatus;
  dzuhur: ShalatStatus;
  ashar: ShalatStatus;
  maghrib: ShalatStatus;
  isya: ShalatStatus;
  keterangan?: string;
  dicatat_oleh?: number;
  santri_nama?: string;
  santri_nis?: string;
  dicatat_oleh_nama?: string;
  created_at: string;
}

export interface JurnalShalatStats {
  total_hari: number;
  subuh_hadir: number;
  dzuhur_hadir: number;
  ashar_hadir: number;
  maghrib_hadir: number;
  isya_hadir: number;
}

// Kehadiran types
export interface Kehadiran {
  id: number;
  uuid: string;
  user_id: number;
  user_type: 'santri' | 'pengajar';
  tanggal: string;
  waktu_masuk?: string;
  waktu_keluar?: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpha';
  keterangan?: string;
  dicatat_oleh?: number;
  user_nama?: string;
  nis?: string;
  role?: string;
  dicatat_oleh_nama?: string;
  created_at: string;
}

export interface KehadiranStats {
  total_hari: number;
  hadir: number;
  izin: number;
  sakit: number;
  alpha: number;
}

// Pelanggaran types
export interface JenisPelanggaran {
  id: number;
  uuid: string;
  nama: string;
  tingkat: 'ringan' | 'sedang' | 'berat';
  poin: number;
  deskripsi?: string;
  created_at: string;
}

export interface Pelanggaran {
  id: number;
  uuid: string;
  santri_id: number;
  jenis_pelanggaran_id: number;
  tanggal: string;
  waktu: string;
  lokasi?: string;
  kronologi: string;
  sanksi?: string;
  status: 'proses' | 'selesai' | 'banding';
  dicatat_oleh: number;
  santri_nama?: string;
  santri_nis?: string;
  jenis_pelanggaran?: string;
  tingkat?: 'ringan' | 'sedang' | 'berat';
  poin?: number;
  dicatat_oleh_nama?: string;
  created_at: string;
}

export interface PelanggaranStats {
  total_pelanggaran: number;
  total_poin: number;
  pelanggaran_ringan: number;
  pelanggaran_sedang: number;
  pelanggaran_berat: number;
}
