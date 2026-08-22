import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuGrid from './MenuGrid';
import BottomNav from '../../components/common/BottomNav';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDatang, setIsDatang] = useState(false);

  const handleDatangPulang = () => {
    setIsDatang(!isDatang);
    // TODO: Implement API call for attendance
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Mobile Container - Centered */}
      <div className="max-w-md mx-auto min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Demo</h2>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  📍 Demo Epesantren
                </p>
              </div>
            </div>

            {/* Photo Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-32 flex items-center justify-center mb-4">
              <div className="text-center text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs font-medium">Demo Epesantren</p>
              </div>
            </div>

            {/* Datang Pulang Section */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-around">
                <button 
                  onClick={handleDatangPulang}
                  className={`flex flex-col items-center gap-2 ${isDatang ? 'opacity-50' : ''}`}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-bold">Datang</span>
                </button>

                <div className="text-white text-2xl font-bold">-</div>

                <button 
                  onClick={handleDatangPulang}
                  className={`flex flex-col items-center gap-2 ${!isDatang ? 'opacity-50' : ''}`}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-bold">Pulang</span>
                </button>
              </div>
            </div>

            {/* Shifir Section */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Shifir A</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src="https://i.pravatar.cc/40?img=1" alt="Avatar 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white -ml-3">
                    <img src="https://i.pravatar.cc/40?img=2" alt="Avatar 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white -ml-3"></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Shifir B</h4>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src="https://i.pravatar.cc/40?img=3" alt="Avatar 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white -ml-3"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white -ml-3"></div>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <MenuGrid />
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;
