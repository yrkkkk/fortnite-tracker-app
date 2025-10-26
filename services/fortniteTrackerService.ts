// СКОПИРУЙТЕ ЭТОТ КОД В services/fortniteTrackerService.ts

import type { FortniteApiResponse, FortniteError, LeaderboardEntry, PowerRankingResult, PowerRankingError } from '../types';

const PROXY_URL = '/api/fortnite-proxy';

/**
 * Fetches Fortnite player stats via the backend proxy.
 */
export const getProfile = async (username: string, platform: string): Promise<FortniteApiResponse | FortniteError> => {
  console.log(`Fetching data for player: ${username} on platform: ${platform} via proxy`);
  
  try {
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
 * Fetches the global wins leaderboard via the backend proxy.
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[] | { error: string }> => {
  console.log('Fetching REAL leaderboard data via proxy.');
  
  try {
    const response = await fetch(`${PROXY_URL}?type=leaderboard`);
    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Failed to fetch leaderboard:', data.error);
      return { error: data.error || `API Error: ${response.statusText}` };
    }
    
    // API может вернуть данные в другом формате, поэтому мы берем их из data.data
    // Если возникнет ошибка, возможно, нужно будет изменить на data.items или просто data
    return data.data as LeaderboardEntry[];

  } catch (error) {
    console.error('Proxy call for leaderboard failed:', error);
    return { error: 'Failed to fetch leaderboard from the proxy server.' };
  }
};

/**
 * Fetches a player's regional power ranking via the backend proxy.
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