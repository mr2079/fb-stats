import { HttpService } from "@nestjs/axios";
import { Injectable, Scope } from "@nestjs/common";
import CompetitionItems from "../models/competition-items.interface";
import { firstValueFrom } from 'rxjs';
import CompetitionStanding from '../models/competition-standing.interface';

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
}