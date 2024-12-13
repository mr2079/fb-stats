import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiParam } from "@nestjs/swagger";
import CompetitionStandingsResponseDTO, { Country, Standings, Team } from "src/application/models/dtos/responses/competition-standings-response.dto";
import IResponse from "src/application/models/dtos/responses/response.interface";
import { CompetitionErrors } from "src/application/models/errors/competition.error";
import { CompetitionListQuery } from "src/application/queries/competitions/competition-list.handler";
import { CompetitionStandingQuery } from "src/application/queries/competitions/competition-standing.handler";
import { CompetitionQuery } from "src/application/queries/competitions/competition.handler";
import Competition from "src/domain/entities/competition.entity";
import Football360ApiService from "src/infrastructure/services/football360-api.service";
import { DataSource } from "typeorm";

@Controller("api/v1/competitions")
export default class CompetitionController {
    constructor(
        private readonly _queryBus : QueryBus,
        private readonly _appDataSource: DataSource,
        private readonly _apiService: Football360ApiService
    ) { }

    @Get()
    async fetchAllAsync() : Promise<IResponse> {
        return this._queryBus.execute(new CompetitionListQuery());
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: "number"
    })
    async fetchAsync(@Param() { id }: { id: number }) : Promise<IResponse> {
        return this._queryBus.execute(new CompetitionQuery(id));
    }

    @Get(":id/standings")
    @ApiParam({
        name: "id",
        type: "number"
    })
    async fetchStandingsAsync(@Param() { id }: { id: number }) : Promise<IResponse> {
        //return this._queryBus.execute(new CompetitionStandingQuery(id));

        return this._appDataSource.manager.findOne(Competition, {
            where: {
                id
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
                            st.scored_goals,
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
                    //this._logger.error(`${CompetitionStandingQuery.name} - error : ${err}`);
                    return new CompetitionStandingsResponseDTO(false, null, CompetitionErrors.fetchStandingsException);
                })
        })
        .catch(err => {
            //this._logger.error(`${CompetitionStandingQuery.name} - error : ${err}`);
            return new CompetitionStandingsResponseDTO(false, null, CompetitionErrors.GetCompetitionException);
        });
    }
}