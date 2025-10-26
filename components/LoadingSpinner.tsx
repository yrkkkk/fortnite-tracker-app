
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-cyan-400"></div>
      <p className="text-3xl text-cyan-300 font-semibold">Searching for player...</p>
    </div>
  );
};

export default LoadingSpinner;
