import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto min-h-screen bg-gradient-pesantren relative shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
