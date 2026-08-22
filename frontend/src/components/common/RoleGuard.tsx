import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../config/menuConfig';
import { canAccess } from '../../utils/roleHelper';

interface RoleGuardProps {
  roles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component untuk conditional rendering berdasarkan role
 * Hanya render children jika user memiliki salah satu role yang diizinkan
 * 
 * @example
 * <RoleGuard roles={['pengajar', 'admin']}>
 *   <button>Edit Data</button>
 * </RoleGuard>
 */
const RoleGuard = ({ roles, children, fallback = null }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!canAccess(user?.role as UserRole, roles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGuard;
