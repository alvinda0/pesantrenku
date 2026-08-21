import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Selamat Datang, {user?.nama}!</h2>
        <p className="text-gray-600">
          Anda login sebagai <span className="font-semibold capitalize">{user?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tahfidz</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
            <span className="text-4xl">📖</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Jurnal Shalat</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
            <span className="text-4xl">🕌</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Kehadiran</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
            <span className="text-4xl">📚</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pelanggaran</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
            <span className="text-4xl">⚠️</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          📝 <strong>Catatan:</strong> Dashboard statistik akan ditampilkan di sini. Gunakan menu di sidebar untuk mengakses fitur aplikasi.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
