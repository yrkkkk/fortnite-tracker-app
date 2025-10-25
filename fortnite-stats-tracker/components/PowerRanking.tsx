import React from 'react';
import type { PowerRankingResult } from '../types';

interface PowerRankingProps {
  data: PowerRankingResult;
  platform: string;
  region: string;
}

const PowerRanking: React.FC<PowerRankingProps> = ({ data, platform, region }) => {
  return (
    <div className="animate-fade-in bg-gray-800/40 p-6 rounded-2-xl backdrop-blur-md border border-gray-700">
      <h3 className="text-4xl font-bold text-cyan-400 mb-6 text-center uppercase">
        Power Ranking - {region} ({platform.toUpperCase()})
      </h3>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-4xl font-bold text-white">#{data.rank.toLocaleString()}</p>
            <p className="text-lg text-gray-400 uppercase">Rank</p>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-4xl font-bold text-white">{data.points.toLocaleString()}</p>
            <p className="text-lg text-gray-400 uppercase">Points</p>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-4xl font-bold text-white">{data.cashPrize}</p>
            <p className="text-lg text-gray-400 uppercase">Cash Prize</p>
        </div>
      </div>

      {/* Events Table */}
      <h4 className="text-3xl font-bold text-cyan-400 mb-4 text-center uppercase">Recent Events</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xl uppercase text-gray-400 border-b-2 border-gray-600">
            <tr>
              <th scope="col" className="p-4">Event</th>
              <th scope="col" className="p-4 text-center">Rank</th>
              <th scope="col" className="p-4 text-right">Points</th>
              <th scope="col" className="p-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="text-2xl">
            {data.events.map((event, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                <td className="p-4 font-semibold text-white">{event.eventName}</td>
                <td className="p-4 font-bold text-center">#{event.rank}</td>
                <td className="p-4 font-bold text-cyan-400 text-right">{event.points.toLocaleString()}</td>
                <td className="p-4 text-gray-300 text-right">{event.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PowerRanking;
