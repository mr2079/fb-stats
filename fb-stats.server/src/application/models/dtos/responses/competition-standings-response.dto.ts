import ResponseDTO from './response.dto';

export default class CompetitionStandingsResponseDTO extends ResponseDTO {
  constructor(
    public success: boolean,
    public standings?: Standings[],
    public message?: string,
  ) {
    super(success, message);
  }
}

export class Standings {
  constructor(
    public team: Team,
    public rank: number,
    public score: number,
    public playedMatches: number,
    public wonMatches: number,
    public lostMatches: number,
    public scoredGoals: number,
    public concededGoals: number,
    public redCards: number,
    public yellowCards: number,
    public goalDifference: number,
    public totalCards: number,
    public isInLiveMatch: boolean,
    public rankChange: number,
  ) {}
}

export class Team {
  constructor(
    public id: string,
    public slug: string,
    public title: string,
    public englishName: string,
    public logo: string,
    public thumbnail: string,
    public isActive: boolean,
    public fullTitle: string,
    public isNational: boolean,
    public country: Country,
    public toBeDecided: boolean,
  ) {}
}

export class Country {
  constructor(
    public name: string,
    public englishName: string,
    public flag1x1: string,
    public flag4x3: string,
  ) {}
}
