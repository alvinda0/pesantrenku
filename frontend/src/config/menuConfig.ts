export type UserRole = 'santri' | 'pengajar' | 'admin';

export interface MenuItemConfig {
  label: string;
  path: string;
  icon: string;
  roles: UserRole[];
  badge?: number;
}

export interface MenuGroupConfig {
  title: string;
  items: MenuItemConfig[];
}

export const menuConfig: MenuGroupConfig[] = [
  {
    title: 'Main',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: '📊',
        roles: ['santri', 'pengajar', 'admin'],
      },
      {
        label: 'Profile',
        path: '/profile',
        icon: '👤',
        roles: ['santri', 'pengajar', 'admin'],
      },
    ],
  },
  {
    title: 'Aktivitas Santri',
    items: [
      {
        label: 'Tahfidz',
        path: '/tahfidz',
        icon: '📖',
        roles: ['santri', 'pengajar', 'admin'],
      },
      {
        label: 'Jurnal Shalat',
        path: '/shalat',
        icon: '🕌',
        roles: ['santri', 'pengajar', 'admin'],
      },
      {
        label: 'Kehadiran',
        path: '/kehadiran',
        icon: '📚',
        roles: ['santri', 'pengajar', 'admin'],
      },
    ],
  },
  {
    title: 'Kedisiplinan',
    items: [
      {
        label: 'Pelanggaran',
        path: '/pelanggaran',
        icon: '⚠️',
        roles: ['santri', 'pengajar', 'admin'],
      },
    ],
  },
  {
    title: 'Manajemen',
    items: [
      {
        label: 'Manajemen User',
        path: '/users',
        icon: '👥',
        roles: ['pengajar', 'admin'],
      },
    ],
  },
];

// Helper function untuk filter menu berdasarkan role
export const filterMenuByRole = (
  menuGroups: MenuGroupConfig[],
  userRole: UserRole | undefined
): MenuGroupConfig[] => {
  if (!userRole) return [];

  return menuGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(userRole)),
    }))
    .filter((group) => group.items.length > 0);
};
