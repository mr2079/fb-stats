export interface TeamMatchesResponse {
  success: boolean;
  matches?: Match[];
  message?: string;
}

export interface Match {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  statusDetails: StatusDetails;
  holdsAt: number;
  startedAt: number;
  isActive: boolean;
  isPostponed: boolean;
  isFinished: boolean;
  weekNumber: number;
  minute: number;
  slug: string;
  homePenaltyScore: string;
  awayPenaltyScore: string;
  roundType: RoundType;
}

export interface Team {
  slug: string;
  title: string;
  englishName: string;
  logo: string;
  thumbnail: string;
  isActive: boolean;
  fullTitle: string;
  isNational: boolean;
  country: Country;
}

export interface Country {
  name: string;
  englishName: string;
  flag1x1: string;
  flag4x3: string;
}

export interface StatusDetails {
  title: string;
  statusType: string;
}

export interface RoundType {
  name: string;
  value: number;
  isKnockout: boolean;
  displayName: string;
}
