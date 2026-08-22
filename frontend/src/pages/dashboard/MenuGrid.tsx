import { useNavigate } from 'react-router-dom';

const MenuGrid = () => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: '📚', 
      label: 'Absensi Pengasuh',
      bgColor: 'bg-green-100',
      path: '/kehadiran'
    },
    { 
      icon: '📋', 
      label: 'Absensi Kegiatan',
      bgColor: 'bg-green-100',
      path: '/kehadiran'
    },
    { 
      icon: '📖', 
      label: 'Tahfidz',
      bgColor: 'bg-green-100',
      path: '/tahfidz'
    },
    { 
      icon: '👥', 
      label: 'User',
      bgColor: 'bg-green-100',
      path: '/users'
    },
    { 
      icon: '🛋️', 
      label: 'Konseling',
      bgColor: 'bg-green-100',
      path: '#'
    },
    { 
      icon: '🏥', 
      label: 'Laporan Kesehatan',
      bgColor: 'bg-green-100',
      path: '#'
    },
    { 
      icon: '🤝', 
      label: 'Kunjungan',
      bgColor: 'bg-green-100',
      path: '#'
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => item.path !== '#' && navigate(item.path)}
          className="flex flex-col items-center gap-2 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center text-2xl`}>
            {item.icon}
          </div>
          <span className="text-xs text-center text-gray-700 font-medium leading-tight">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MenuGrid;
