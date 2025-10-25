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
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    console.log('Fetching leaderboard data (mocked).');
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    return [
      { id: 'ninja', rank: 1, epicUserHandle: 'Ninja', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '25,123', valueInt: 25123, rank: 1, percentile: 99.9, displayValue: '25,123' } },
      { id: 'tfue', rank: 2, epicUserHandle: 'Tfue', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '22,456', valueInt: 22456, rank: 2, percentile: 99.8, displayValue: '22,456' } },
      { id: 'bugha', rank: 3, epicUserHandle: 'Bugha', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '19,876', valueInt: 19876, rank: 3, percentile: 99.7, displayValue: '19,876' } },
      { id: 'mongraal', rank: 4, epicUserHandle: 'Mongraal', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '18,123', valueInt: 18123, rank: 4, percentile: 99.6, displayValue: '18,123' } },
      { id: 'clix', rank: 5, epicUserHandle: 'Clix', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '17,543', valueInt: 17543, rank: 5, percentile: 99.5, displayValue: '17,543' } },
      { id: 'benjyfishy', rank: 6, epicUserHandle: 'benjyfishy', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '16,987', valueInt: 16987, rank: 6, percentile: 99.4, displayValue: '16,987' } },
      { id: 'mrsavage', rank: 7, epicUserHandle: 'MrSavage', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '16,234', valueInt: 16234, rank: 7, percentile: 99.3, displayValue: '16,234' } },
      { id: 'zayt', rank: 8, epicUserHandle: 'Zayt', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '15,678', valueInt: 15678, rank: 8, percentile: 99.2, displayValue: '15,678' } },
      { id: 'saf', rank: 9, epicUserHandle: 'Saf', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '15,111', valueInt: 15111, rank: 9, percentile: 99.1, displayValue: '15,111' } },
      { id: 'epics_whale', rank: 10, epicUserHandle: 'EpikWhale', platformNameLong: 'PC', stat: { key: 'Wins', label: 'Wins', value: '14,888', valueInt: 14888, rank: 10, percentile: 99.0, displayValue: '14,888' } },
    ];
};

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