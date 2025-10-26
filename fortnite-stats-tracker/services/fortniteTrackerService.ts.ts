import type { FortniteApiResponse, FortniteError, LeaderboardEntry, PowerRankingResult, PowerRankingError } from '../types';

// The API calls are now directed to our own serverless function proxy.
// This function will live at `/api/fortnite-proxy` when deployed.
// It is responsible for securely calling the real Fortnite Tracker API.

const PROXY_URL = '/api/fortnite-proxy';

/**
 * Fetches Fortnite player stats via the backend proxy.
 * @param {string} username - The Epic Games username.
 * @param {string} platform - The platform ('pc', 'console', 'mobile').
 * @returns {Promise<FortniteApiResponse | FortniteError>}
 */
export const getProfile = async (username: string, platform: string): Promise<FortniteApiResponse | FortniteError> => {
  console.log(`Fetching data for player: ${username} on platform: ${platform} via proxy`);
  
  try {
    // We call our own API endpoint, not the external one.
    const response = await fetch(`${PROXY_URL}?type=profile&platform=${platform}&username=${username}`);
    
    const data = await response.json();

    if (!response.ok || data.error) {
      return { error: data.error || data.message || `API Error: ${response.statusText}` };
    }

    return data as FortniteApiResponse;
  } catch (error) {
    console.error('Proxy call failed:', error);
    return { error: 'Failed to fetch from the proxy server. Is it running?' };
  }
};

/**
 * Fetches the global wins leaderboard (mocked).
 * This remains mocked as it's a stable demonstration feature.
 * @returns {Promise<LeaderboardEntry[]>}
 */
// В файле services/fortniteTrackerService.ts

import type { FortniteApiResponse, FortniteError, LeaderboardEntry, ... } from '../types'; // Убедитесь, что все типы импортированы

const PROXY_URL = '/api/fortnite-proxy';

// ... ваша функция getProfile остается без изменений ...

/**
 * Fetches the global wins leaderboard via the backend proxy.
 * @returns {Promise<LeaderboardEntry[] | { error: string }>}
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[] | { error: string }> => {
  console.log('Fetching REAL leaderboard data via proxy.');
  
  try {
    // Мы добавляем новый тип запроса 'leaderboard' в URL
    const response = await fetch(`${PROXY_URL}?type=leaderboard`);
    
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Failed to fetch leaderboard:', data.error);
      return { error: data.error || `API Error: ${response.statusText}` };
    }
    
    // API может вернуть данные в другом формате, 
    // возможно, их придется обработать, чтобы они соответствовали типу LeaderboardEntry[]
    // Например, если данные в data.items: return data.items as LeaderboardEntry[];
    return data as LeaderboardEntry[];

  } catch (error) {
    console.error('Proxy call for leaderboard failed:', error);
    return { error: 'Failed to fetch leaderboard from the proxy server.' };
  }
};

// ... ваша функция getPowerRanking остается без изменений ...

/**
 * Fetches a player's regional power ranking via the backend proxy.
 * @param {string} platform
 * @param {string} region
 * @param {string} username
 * @returns {Promise<PowerRankingResult | PowerRankingError>}
 */
export const getPowerRanking = async (platform: string, region: string, username: string): Promise<PowerRankingResult | PowerRankingError> => {
  console.log(`Fetching power ranking for ${username} on ${platform} in ${region} via proxy`);
  
  try {
    const response = await fetch(`${PROXY_URL}?type=powerranking&platform=${platform}&region=${region}&username=${username}`);
    
    const data = await response.json();

    if (!response.ok || data.error) {
      return { error: data.error || data.message || `API Error: ${response.statusText}` };
    }

    return data as PowerRankingResult;

  } catch (error) {
    console.error('Proxy call for power ranking failed:', error);
    return { error: 'Failed to fetch power ranking from the proxy server.' };
  }
};