import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
    data: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
    return (
        <div className="mt-12 animate-fade-in">
            <h2 className="text-5xl font-bold text-center mb-6 text-cyan-400 uppercase">Global Wins Leaderboard</h2>
            <div className="max-w-4xl mx-auto bg-gray-800/40 p-2 md:p-6 rounded-2xl backdrop-blur-md border border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xl uppercase text-gray-400 border-b-2 border-gray-600">
                            <tr>
                                <th scope="col" className="p-4 w-16 text-center">Rank</th>
                                <th scope="col" className="p-4">Player</th>
                                <th scope="col" className="p-4 text-center">Platform</th>
                                <th scope="col" className="p-4 text-right">Wins</th>
                            </tr>
                        </thead>
                        <tbody className="text-2xl">
                            {data.map((player, index) => (
                                <tr key={player.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                                    <td className="p-4 font-bold text-center">{player.rank}</td>
                                    <td className="p-4 font-semibold text-white">{player.epicUserHandle}</td>
                                    <td className="p-4 text-center text-gray-300">{player.platformNameLong}</td>
                                    <td className="p-4 font-bold text-cyan-400 text-right">{player.stat.displayValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
