import React from 'react';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileCard: React.FC<MobileCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface MobileCardHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const MobileCardHeader: React.FC<MobileCardHeaderProps> = ({ 
  title, 
  onBack,
  rightAction 
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h2 className="text-lg font-semibold flex-1 text-center">{title}</h2>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
};

export default MobileCard;
