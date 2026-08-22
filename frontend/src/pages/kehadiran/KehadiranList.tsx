import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';

const KehadiranList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Mobile Container - Centered */}
      <div className="max-w-md mx-auto min-h-screen bg-gray-100">
        {/* Content */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 mb-4">Data kehadiran akan ditampilkan di sini.</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors">
                Catat Kehadiran
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default KehadiranList;
