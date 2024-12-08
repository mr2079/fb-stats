import { HttpService } from "@nestjs/axios";
import { Controller, Get } from "@nestjs/common";
import CompetitionInfo from "./initialize.interface";
import appDataSource from "./infrastructure/data/AppDataSource";
import Competition from "./domain/entities/competition.entity";

@Controller("initialize")
export default class InitializeController {
    private readonly _competitions = {
        persianGulfProLeague: "67815c19-3b18-465c-bbd7-5eac82f83ffc",
        premierLeague: "40f78d7a-6327-4533-91c5-8c412523ab4a",
        laliga: "1b058587-cb72-4de4-8c3f-f60d044d89f2",
        bundesliga: "9ee742e8-e81e-4bae-8a7e-2a7c899b7492",
        serieA: "d93d30a3-0175-4ce4-ba36-2d9e324365eb",
        league1: "36d36916-1a48-4ad7-83d9-28981ec7d37c",
        ligaPortugal: "8c10800f-0a3a-4261-9891-c47e4bfdddfa",
        uefaChampionsLeague: "90cfdc57-19a8-444e-bc73-240b8eb2b00c",
        uefaEuropaLeague: "f31e4219-dc58-4740-9b26-f3fafac3460f",
    }

    constructor(private readonly _http: HttpService) { }

    @Get()
    async initAsync() : Promise<void> {
        const competitionNames = Object.keys(this._competitions);
        competitionNames.forEach(async competitionName => {
            const competitionId = this._competitions[competitionName];
            this._http.get<CompetitionInfo>(`https://football360.ir/api/base/v2/competition-trends/${competitionId}/standings`)
                .subscribe(({data: competitionInfo}) => {
                    const competition = appDataSource.manager.create(Competition, {
                        fetchId: competitionId,
                        name: competitionInfo.english_name,
                        title: competitionInfo.title,
                        logo: competitionInfo.logo
                    });
                    appDataSource.manager.save(competition);
                });
        });
    }
}