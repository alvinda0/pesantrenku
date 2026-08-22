import type { UserRole } from '../config/menuConfig';

/**
 * Helper functions untuk role-based access control
 */

export const hasRole = (userRole: UserRole | undefined, allowedRoles: UserRole[]): boolean => {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};

export const isSantri = (userRole: UserRole | undefined): boolean => {
  return userRole === 'santri';
};

export const isPengajar = (userRole: UserRole | undefined): boolean => {
  return userRole === 'pengajar';
};

export const isAdmin = (userRole: UserRole | undefined): boolean => {
  return userRole === 'admin';
};

export const canAccess = (userRole: UserRole | undefined, requiredRoles: UserRole[]): boolean => {
  return hasRole(userRole, requiredRoles);
};

export const getRoleLabel = (role: UserRole | undefined): string => {
  switch (role) {
    case 'santri':
      return 'Santri';
    case 'pengajar':
      return 'Pengajar';
    case 'admin':
      return 'Administrator';
    default:
      return 'Unknown';
  }
};

export const getRoleColor = (role: UserRole | undefined): string => {
  switch (role) {
    case 'santri':
      return 'bg-blue-100 text-blue-800';
    case 'pengajar':
      return 'bg-green-100 text-green-800';
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
