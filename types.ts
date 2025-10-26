export interface StatItem {
  key: string;
  label: string;
  value: string;
  valueInt: number;
  rank: number;
  percentile: number;
  displayValue: string;
}

export interface StatsData {
  top1: StatItem;
  top3?: StatItem;
  top5?: StatItem;
  top6?: StatItem;
  top10?: StatItem;
  top12?: StatItem;
  top25?: StatItem;
  kd: StatItem;
  winRatio: StatItem;
  matches: StatItem;
  kills: StatItem;
  minutesPlayed: StatItem;
  score: StatItem;
  scorePerMatch: StatItem;
  killsPerMatch: StatItem;
  playersOutlived: StatItem;
}

export interface Stats {
  p2: StatsData; // Solo
  p10: StatsData; // Duo
  p9: StatsData; // Squad
}

export interface LifeTimeStat {
  key: string;
  value: string;
}

export interface FortniteApiResponse {
  accountId: string;
  platformId: number;
  platformName: string;
  platformNameLong: string;
  epicUserHandle: string;
  stats: Stats;
  lifeTimeStats: LifeTimeStat[];
  recentMatches: any[];
}

export interface FortniteError {
    error: string;
}

export interface LeaderboardEntry {
    id: string;
    rank: number;
    epicUserHandle: string;
    platformNameLong: string;
    stat: StatItem;
}

// Power Ranking Types
export interface PowerRankingEvent {
  eventName: string;
  rank: number;
  points: number;
  date: string;
}

export interface PowerRankingResult {
  rank: number;
  points: number;
  cashPrize: string;
  events: PowerRankingEvent[];
}

export interface PowerRankingError {
  error: string;
}