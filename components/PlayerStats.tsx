
import React from 'react';
import type { FortniteApiResponse, StatsData } from '../types';
import StatCard from './StatCard';

interface PlayerStatsProps {
  data: FortniteApiResponse;
}

const renderGameModeStats = (title: string, stats: StatsData) => {
  if (!stats) return null;

  return (
    <div className="bg-gray-800/40 p-6 rounded-2xl backdrop-blur-md border border-gray-700">
      <h3 className="text-4xl font-bold text-cyan-400 mb-6 text-center uppercase">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard label={stats.top1.label} value={stats.top1.displayValue} />
        <StatCard label={stats.kd.label} value={stats.kd.displayValue} />
        <StatCard label={stats.winRatio.label} value={`${stats.winRatio.displayValue}%`} />
        <StatCard label={stats.matches.label} value={stats.matches.displayValue} />
        <StatCard label={stats.kills.label} value={stats.kills.displayValue} />
        <StatCard label="Time Played" value={stats.minutesPlayed.displayValue} />
        <StatCard label={stats.score.label} value={stats.score.displayValue} />
      </div>
    </div>
  );
};

const PlayerStats: React.FC<PlayerStatsProps> = ({ data }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="text-center bg-black/30 p-6 rounded-xl">
        <h2 className="text-6xl font-extrabold text-white tracking-wide">{data.epicUserHandle}</h2>
        <p className="text-2xl text-gray-400 uppercase">{data.platformNameLong}</p>
      </header>

      {/* Lifetime Stats */}
      <div className="bg-gray-800/40 p-6 rounded-2xl backdrop-blur-md border border-gray-700">
        <h3 className="text-4xl font-bold text-cyan-400 mb-6 text-center uppercase">Lifetime Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
          {data.lifeTimeStats.map((stat) => (
            <div key={stat.key} className="bg-gray-900/50 p-4 rounded-lg">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-lg text-gray-400 uppercase">{stat.key}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Per-mode Stats */}
      <div className="space-y-8">
        {renderGameModeStats('Solos', data.stats.p2)}
        {renderGameModeStats('Duos', data.stats.p10)}
        {renderGameModeStats('Squads', data.stats.p9)}
      </div>
    </div>
  );
};

export default PlayerStats;
