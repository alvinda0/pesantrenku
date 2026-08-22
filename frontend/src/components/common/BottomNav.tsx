import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';
  const isProfile = location.pathname === '/profile';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 max-w-md mx-auto rounded-t-3xl">
      <div className="flex items-center justify-around py-3 px-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full shadow-lg transition-all ${
            isDashboard 
              ? 'bg-green-600 text-white' 
              : 'text-gray-600'
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {isDashboard && <span className="text-xs font-bold">Beranda</span>}
        </button>

        <button 
          onClick={() => {/* TODO: Navigate to notifications */}}
          className="flex flex-col items-center gap-1 text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full shadow-lg transition-all ${
            isProfile 
              ? 'bg-green-600 text-white' 
              : 'text-gray-600'
          }`}
        >
          <svg className="w-6 h-6" fill={isProfile ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {isProfile && <span className="text-xs font-bold">Profile</span>}
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
