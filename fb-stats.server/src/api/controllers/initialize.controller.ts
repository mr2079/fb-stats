import { Controller, Get } from "@nestjs/common";
import Competition from "../../domain/entities/competition.entity";
import { DataSource, Repository } from "typeorm";
import Team from "../../domain/entities/team.entity";
import Football360ApiService from "src/infrastructure/services/football360-api.service";

@Controller("initialize")
export default class InitializeController {
    private readonly _competitionRepository : Repository<Competition>;
    private readonly _teamRepository : Repository<Team>;

    constructor(
        private readonly _appDataSource: DataSource,
        private readonly _apiService: Football360ApiService,
        ) { 
            this._competitionRepository = _appDataSource.getRepository(Competition);
            this._teamRepository = _appDataSource.getRepository(Team);
        }

    @Get()
    async initAsync() : Promise<void> {
        const existedCompetitions = await this._competitionRepository.find();
        if (existedCompetitions) return;
        
        const competitionItems = await this._apiService.getCompetitionItemsAsync();
        competitionItems.data.forEach(item => {
            const competition = this._competitionRepository.create({
                fetchId: item.shortcut_id,
                name: item.english_name ?? item.title ?? "",
                title: item.title ?? item.english_name ?? "",
                logo: ""
            });
            this._competitionRepository.save(competition)
                .then(async (competition: Competition) => {
                    const competitionStandings = await this._apiService.getCompetitionStandingAsync(competition.fetchId);
                    const teams = competitionStandings
                        .competition_trend_stages[0]
                        .standing_table.map(st => {
                            const team = new Team();
                            team.competitionId = competition.id;
                            team.fetchId = st.team.id;
                            team.name = st.team.english_name ?? st.team.title ?? "";
                            team.title = st.team.title ?? st.team.english_name ?? "";
                            team.logo = st.team.logo ?? "";
                            return team;
                        });
                    this._teamRepository.create(teams);
                    this._teamRepository.save(teams);
                    this._competitionRepository.update(competition.id, { logo: competitionStandings.logo });
                });
        });
    }
}