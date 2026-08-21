import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
      roles: ['santri', 'pengajar'],
    },
    {
      label: 'Tahfidz',
      path: '/tahfidz',
      icon: '📖',
      roles: ['santri', 'pengajar'],
    },
    {
      label: 'Jurnal Shalat',
      path: '/shalat',
      icon: '🕌',
      roles: ['santri', 'pengajar'],
    },
    {
      label: 'Kehadiran',
      path: '/kehadiran',
      icon: '📚',
      roles: ['santri', 'pengajar'],
    },
    {
      label: 'Pelanggaran',
      path: '/pelanggaran',
      icon: '⚠️',
      roles: ['santri', 'pengajar'],
    },
    {
      label: 'Manajemen User',
      path: '/users',
      icon: '👥',
      roles: ['pengajar'],
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: '👤',
      roles: ['santri', 'pengajar'],
    },
  ];

  const filteredMenu = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>
        <nav className="space-y-1">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
