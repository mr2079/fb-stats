import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import CompetitionItems from "../models/competition-items.interface";
import { firstValueFrom } from 'rxjs';
import CompetitionStanding from '../models/competition-standing.interface';
import TeamMatches from "../models/team-matches.interface";

@Injectable()
export default class Football360ApiService {
    private readonly _baseUrl: string = "https://football360.ir";

    constructor(
        private readonly _http : HttpService
    ) { }

    private competitionItemsUrl() : string {
        return `${this._baseUrl}/api/cms/v2/chips/competition-standing/items`; 
    }
    private competitionStandingsUrl(competitionId: string) : string {
        return `${this._baseUrl}/api/base/v2/competition-trends/${competitionId}/standings`; 
    }
    private teamMatchesUrl(teamId: string, lastMatchesCount: number = 50) : string {
        return `${this._baseUrl}/api/base/teams/${teamId}/matches/?last_matches_count=${lastMatchesCount}`; 
    }

    async getCompetitionItemsAsync() : Promise<CompetitionItems | undefined | null> {
        try {
            const response = await firstValueFrom(
                this._http.get<CompetitionItems>(this.competitionItemsUrl())
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }
    
    async getCompetitionStandingAsync(competitionId: string) : Promise<CompetitionStanding | undefined | null> {
        try {
            const response = await firstValueFrom(
                this._http.get<CompetitionStanding>(this.competitionStandingsUrl(competitionId))
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getTeamMatchesAsync(teamId: string, lastMatchesCount: number = 50) : Promise<TeamMatches | undefined | null> {
        try {
            const response = await firstValueFrom(
                this._http.get<TeamMatches>(this.teamMatchesUrl(teamId, lastMatchesCount))
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }
}