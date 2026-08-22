import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Mobile Container - Centered */}
      <div className="max-w-md mx-auto min-h-screen bg-gray-100">
        {/* Content */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-4xl mx-auto mb-4">
                {user?.nama?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-white">{user?.nama}</h2>
              <p className="text-green-100 text-sm mt-1">{user?.email}</p>
            </div>

            {/* Profile Details */}
            <div className="p-4 space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                <p className="text-gray-900 font-medium capitalize">{user?.role}</p>
              </div>

              {user?.nis && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">NIS</label>
                  <p className="text-gray-900 font-medium">{user.nis}</p>
                </div>
              )}

              {user?.jenis_kelamin && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Jenis Kelamin</label>
                  <p className="text-gray-900 font-medium capitalize">
                    {user.jenis_kelamin === 'laki-laki' ? 'Laki-laki' : 'Perempuan'}
                  </p>
                </div>
              )}

              {user?.no_telp && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">No. Telepon</label>
                  <p className="text-gray-900 font-medium">{user.no_telp}</p>
                </div>
              )}

              {user?.alamat && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Alamat</label>
                  <p className="text-gray-900 font-medium">{user.alamat}</p>
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  user?.status === 'aktif' 
                    ? 'bg-green-100 text-green-800' 
                    : user?.status === 'alumni'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user?.status?.charAt(0).toUpperCase() + user?.status?.slice(1)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar
                </button>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Bergabung sejak {new Date(user?.created_at || '').toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;
