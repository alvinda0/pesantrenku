// Format date to Indonesian format
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormat Options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return d.toLocaleDateString('id-ID', options);
};

// Format date to YYYY-MM-DD for input
export const formatDateInput = (date: string | Date): string => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

// Format time to HH:MM
export const formatTime = (time: string): string => {
  if (!time) return '-';
  return time.substring(0, 5);
};

// Get status badge color
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    hadir: 'badge-success',
    tidak_hadir: 'badge-danger',
    terlambat: 'badge-warning',
    izin: 'badge-info',
    sakit: 'badge-warning',
    alpha: 'badge-danger',
    aktif: 'badge-success',
    nonaktif: 'badge-danger',
    proses: 'badge-warning',
    selesai: 'badge-success',
    banding: 'badge-info',
  };
  return colors[status] || 'badge-info';
};

// Get nilai color
export const getNilaiColor = (nilai: string): string => {
  const colors: Record<string, string> = {
    A: 'badge-success',
    B: 'badge-info',
    C: 'badge-warning',
    D: 'badge-danger',
  };
  return colors[nilai] || 'badge-info';
};

// Get tingkat pelanggaran color
export const getTingkatColor = (tingkat: string): string => {
  const colors: Record<string, string> = {
    ringan: 'badge-info',
    sedang: 'badge-warning',
    berat: 'badge-danger',
  };
  return colors[tingkat] || 'badge-info';
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Get current date in YYYY-MM-DD format
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Get current time in HH:MM format
export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
