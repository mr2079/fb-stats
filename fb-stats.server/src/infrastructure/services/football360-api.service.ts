import { Data } from './../models/competition-items.interface';
import { HttpService } from "@nestjs/axios";
import { Injectable, Scope } from "@nestjs/common";
import CompetitionItems from "../models/competition-items.interface";
import CompetitionStandings from "../models/competition-standings.interface";
import { firstValueFrom } from 'rxjs';

@Injectable({scope: Scope.REQUEST})
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
    
    async getCompetitionStandingsAsync(competitionId: string) : Promise<CompetitionStandings | undefined | null> {
        try {
            const response = await firstValueFrom(
                this._http.get<CompetitionStandings>(this.competitionStandingsUrl(competitionId))
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }
}