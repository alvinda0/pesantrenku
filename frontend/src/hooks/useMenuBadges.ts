interface MenuBadges {
  [key: string]: number;
}

/**
 * Hook untuk mengelola badge notifikasi pada menu
 * Contoh: menampilkan jumlah pelanggaran baru, tahfidz yang belum direview, dll
 */
export const useMenuBadges = (): MenuBadges => {
  // TODO: Implementasikan logic untuk fetch badge counts
  // Contoh:
  // - Untuk pengajar: jumlah tahfidz yang perlu direview
  // - Untuk santri: jumlah pelanggaran baru
  // - Untuk admin: jumlah user pending approval
  
  // Sementara return empty object
  return {};
};
