export interface CompetitionStandingResponse {
  success: boolean;
  standing?: Standing[];
  message?: string;
}

export interface Standing {
  team: Team;
  rank: number;
  score: number;
  playedMatches: number;
  wonMatches: number;
  lostMatches: number;
  scoredGoals: number;
  concededGoals: number;
  redCards: number;
  yellowCards: number;
  goalDifference: number;
  totalCards: number;
  isInLiveMatch: boolean;
  rankChange: number;
}

export interface Team {
  id: string;
  slug: string;
  title: string;
  englishName: string;
  logo: string;
  thumbnail: string;
  isActive: boolean;
  fullTitle: string;
  isNational: boolean;
  country: Country;
  toBeDecided: boolean;
}

export interface Country {
  name: string;
  englishName: string;
  flag1x1: string;
  flag4x3: string;
}
