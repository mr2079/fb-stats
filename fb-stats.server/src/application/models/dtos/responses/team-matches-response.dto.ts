import ResponseDTO from './response.dto';

export default class TeamMatchesResponseDTO extends ResponseDTO {
  constructor(
    public success: boolean,
    public matches?: Matches,
    public message?: string,
  ) {
    super(success, message);
  }
}

export class Matches {
  constructor(
    public lastMatches?: Match[],
    public nextMatches?: Match[]
  ) { }
}

export class Match {
  constructor(
    public homeTeam: Team,
    public awayTeam: Team,
    public homeScore: number,
    public awayScore: number,
    public statusDetails: StatusDetails,
    public holdsAt: number,
    public startedAt: number,
    public isActive: boolean,
    public isPostponed: boolean,
    public isFinished: boolean,
    public weekNumber: number,
    public minute: number,
    public slug: string,
    public homePenaltyScore: string,
    public awayPenaltyScore: string,
    public roundType: RoundType
  ) {}
}

export class Team {
  constructor(
    public slug: string,
    public title: string,
    public englishName: string,
    public logo: string,
    public thumbnail: string,
    public isActive: boolean,
    public fullTitle: string,
    public isNational: boolean,
    public country: Country
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

export class StatusDetails {
  constructor(
    public title: string,
    public statusType: string,
  ) {}
}

export class RoundType {
  constructor(
    public name: string,
    public value: number,
    public isKnockout: boolean,
    public displayName: string,
  ) {}
}
