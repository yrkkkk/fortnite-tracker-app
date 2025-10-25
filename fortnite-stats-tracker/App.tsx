
import React, { useState, useCallback, useEffect } from 'react';
import { getProfile, getLeaderboard, getPowerRanking } from './services/fortniteTrackerService';
import type { FortniteApiResponse, FortniteError, LeaderboardEntry, PowerRankingResult } from './types';
import SearchForm from './components/SearchForm';
import PlayerStats from './components/PlayerStats';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import InitialState from './components/InitialState';
import Leaderboard from './components/Leaderboard';
import PowerRanking from './components/PowerRanking';

const backgroundImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAHMAcMDASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAA5EAABAwMEAQQCAgECBQUBAQABAAIRAxIEITETQVFhBSJxgZEGFKGxIzLB0VLh8ELxU2JygpKiFjRD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQACAwT/xAAgEQEBAQEAAgICAwEAAAAAAAAAAQIRITESQVEDYXET/9oADAMBAAIRAxEAPwD6hERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQ-i//2w==';

// FIX: Corrected typo `React.-FC` to `React.FC`.
const App: React.FC = () => {
  const [playerData, setPlayerData] = useState<FortniteApiResponse | null>(null);
  const [powerRankingData, setPowerRankingData] = useState<PowerRankingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[] | null>(null);
  const [currentSearch, setCurrentSearch] = useState<{platform: string; region: string} | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboardData(data);
    };
    fetchLeaderboard();
  }, []);

  const handleSearch = useCallback(async (username: string, platform: string, region: string) => {
    if (!username) {
      setError('Please enter an Epic Games username.');
      return;
    }
    setIsLoading(true);
    setPlayerData(null);
    setPowerRankingData(null);
    setError(null);
    setCurrentSearch({ platform, region });

    try {
      // Pass platform to getProfile
      const [profileResult, powerRankingResult] = await Promise.all([
        getProfile(username, platform),
        getPowerRanking(platform, region, username),
      ]);

      if ('error' in profileResult) {
        setError(profileResult.error);
        setPlayerData(null);
      } else {
        setPlayerData(profileResult);
      }
      
      if ('error' in powerRankingResult) {
        // Silently fail or log, as profile is the primary data
        console.error('Power Ranking API Error:', powerRankingResult.error);
        setPowerRankingData(null);
      } else {
        setPowerRankingData(powerRankingResult);
      }

    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      setPlayerData(null);
      setPowerRankingData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="min-h-screen bg-gray-900 bg-opacity-80 backdrop-blur-sm text-white">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <header className="text-center mb-8">
             <h1 className="text-6xl md:text-8xl font-bold tracking-wider uppercase text-cyan-400" style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' }}>
              Fortnite Stats Tracker
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mt-2">Check your stats and regional power ranking</p>
          </header>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          <div className="mt-10">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            <div className="space-y-12">
              {playerData && <PlayerStats data={playerData} />}
              {powerRankingData && currentSearch && <PowerRanking data={powerRankingData} platform={currentSearch.platform} region={currentSearch.region} />}
            </div>
            {!isLoading && !error && !playerData && (
              <>
                <InitialState />
                {leaderboardData ? <Leaderboard data={leaderboardData} /> : <div className="mt-12"><LoadingSpinner /></div>}
              </>
            )}
          </div>
        </main>
        <footer className="text-center py-4 text-gray-500 text-sm">
          <p>Сделано YORK</p>
          <p>This is a fan-made tracker and is not affiliated with Epic Games.</p>
          <p>Player data is sourced from the Fortnite-Tracker API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;