
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-lg text-gray-400 uppercase">{label}</p>
    </div>
  );
};

export default StatCard;
