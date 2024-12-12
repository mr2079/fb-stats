import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CompetitionErrors } from "src/application/models/errors/competition.error";
import Competition from "src/domain/entities/competition.entity";
import { DataSource, Repository } from "typeorm";
import Football360ApiService from "src/infrastructure/services/football360-api.service";
import CompetitionStandingsResponseDTO, { Country, Standings, Team } from "src/application/models/dtos/responses/competition-standings-response.dto";

export class CompetitionStandingQuery {
    constructor(
        public id: number
    ) { }
}

@QueryHandler(CompetitionStandingQuery)
export default class CompetitionStandingQueryHandler implements IQueryHandler<CompetitionStandingQuery> {
    private readonly _competitionRepository: Repository<Competition>;
    private readonly _logger = new Logger();

    constructor(
        private readonly _appDataSource: DataSource,
        private readonly _apiService: Football360ApiService
    ) {
        this._competitionRepository = _appDataSource.getRepository(Competition);
    }

    async execute(query: CompetitionStandingQuery) : Promise<CompetitionStandingsResponseDTO> {
        return this._competitionRepository.findOne({
            where: {
                id: query.id
            }
        })
        .then(({ fetchId }) => {
            return this._apiService.getCompetitionStandingsAsync(fetchId)
                .then(competitionStandings => {
                    const standings = 
                        competitionStandings
                        .competition_trend_stages[0]
                        .standing_table
                        .map(st => new Standings(
                            new Team(
                                st.team.id,
                                st.team.slug,
                                st.team.title,
                                st.team.english_name,
                                st.team.logo,
                                st.team.thumbnail,
                                st.team.is_active,
                                st.team.full_title,
                                st.team.is_national,
                                new Country(
                                    st.team.country.name,
                                    st.team.country.english_name,
                                    st.team.country.flag_1x1,
                                    st.team.country.flag_4x3
                                ),
                                st.team.to_be_decided
                            ),
                            st.rank,
                            st.score,
                            st.played_matches,
                            st.won_matches,
                            st.lost_matches,
                            st.score,
                            st.conceded_goals,
                            st.red_cards,
                            st.yellow_cards,
                            st.goal_difference,
                            st.total_cards,
                            st.is_in_live_match,
                            st.rank_change
                        ));

                    return new CompetitionStandingsResponseDTO(true, standings);
                })
                .catch(err => {
                    this._logger.error(`${CompetitionStandingQuery.name} - error : ${err}`);
                    return new CompetitionStandingsResponseDTO(false, null, CompetitionErrors.fetchStandingsException);
                })
        })
        .catch(err => {
            this._logger.error(`${CompetitionStandingQuery.name} - error : ${err}`);
            return new CompetitionStandingsResponseDTO(false, null, CompetitionErrors.GetCompetitionException);
        });
    }
}