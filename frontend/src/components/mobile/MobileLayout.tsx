import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showBackButton = false,
  title 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-pesantren pb-20">
      {/* Back Button */}
      {showBackButton && (
        <div className="p-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="px-4 pb-6">
        {children}
      </div>

      {/* Bottom Text */}
      {title && (
        <div className="fixed bottom-0 left-0 right-0 pb-8 pt-6 px-6 bg-gradient-to-t from-pesantren-green-dark to-transparent">
          <h1 className="text-white text-2xl font-bold text-center leading-relaxed">
            {title}
          </h1>
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
