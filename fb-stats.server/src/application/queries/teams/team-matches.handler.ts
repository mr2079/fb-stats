import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import TeamMatchesResponseDTO, { Country, Match, Matches, Team as MatchTeam, RoundType, StatusDetails } from "src/application/models/dtos/responses/team-matches-response.dto";
import { TeamErrors } from "src/application/models/errors/team.error";
import Team from "src/domain/entities/team.entity";
import Football360ApiService from "src/infrastructure/services/football360-api.service";
import { DataSource, Repository } from "typeorm";

export class TeamMatchesQuery {
    constructor(
        public name: string
    ) { }
}

@QueryHandler(TeamMatchesQuery)
export default class TeamMatchesQueryHandler implements IQueryHandler<TeamMatchesQuery> {
    private readonly _teamRepository: Repository<Team>;
    private readonly _logger = new Logger();

    constructor(
        readonly _appDataSource: DataSource,
        private readonly _apiService: Football360ApiService
    ) {
        this._teamRepository = _appDataSource.getRepository(Team);
    }

    execute(query: TeamMatchesQuery): Promise<TeamMatchesResponseDTO> {
        const normalizedName = query.name
            .toLowerCase()
            .split("-")
            .join(" ");

        return this._teamRepository
            .createQueryBuilder("team")
            .where("team.name ILIKE :name", { name:`%${normalizedName}%` })
            .getMany()
            .then((teams: Team[]) => {
                return this._apiService.getTeamMatchesAsync(teams[0].fetchId)
                    .then(tm => {
                        const lastMatches = tm.last_matches
                            .map(m => new Match(
                                new MatchTeam(
                                    m.home_team?.slug,
                                    m.home_team?.title,
                                    m.home_team?.english_name,
                                    m.home_team?.logo,
                                    m.home_team?.thumbnail,
                                    m.home_team?.is_active,
                                    m.home_team?.full_title,
                                    m.home_team?.is_national,
                                    new Country(
                                        m.home_team?.country?.name,
                                        m.home_team?.country?.english_name,
                                        m.home_team?.country?.flag_1x1,
                                        m.home_team?.country?.flag_4x3
                                    )
                                ),
                                new MatchTeam(
                                    m.away_team?.slug,
                                    m.away_team?.title,
                                    m.away_team?.english_name,
                                    m.away_team?.logo,
                                    m.away_team?.thumbnail,
                                    m.away_team?.is_active,
                                    m.away_team?.full_title,
                                    m.away_team?.is_national,
                                    new Country(
                                        m.away_team?.country?.name,
                                        m.away_team?.country?.english_name,
                                        m.away_team?.country?.flag_1x1,
                                        m.away_team?.country?.flag_4x3
                                    )
                                ),
                                m.home_score,
                                m.away_score,
                                new StatusDetails(
                                    m.status_details?.title,
                                    m.status_details?.status_type
                                ),
                                m.holds_at,
                                m.started_at,
                                m.is_active,
                                m.is_postponed,
                                m.is_finished,
                                m.week_number,
                                m.minute,
                                m.slug,
                                m.home_penalty_score,
                                m.away_penalty_score,
                                new RoundType(
                                    m.round_type?.name,
                                    m.round_type?.value,
                                    m.round_type?.is_knockout,
                                    m.round_type?.display_name
                                )
                            ));
                        const nextMatches = tm.next_matches
                            .map(m => new Match(
                                new MatchTeam(
                                    m.home_team?.slug,
                                    m.home_team?.title,
                                    m.home_team?.english_name,
                                    m.home_team?.logo,
                                    m.home_team?.thumbnail,
                                    m.home_team?.is_active,
                                    m.home_team?.full_title,
                                    m.home_team?.is_national,
                                    new Country(
                                        m.home_team?.country?.name,
                                        m.home_team?.country?.english_name,
                                        m.home_team?.country?.flag_1x1,
                                        m.home_team?.country?.flag_4x3
                                    )
                                ),
                                new MatchTeam(
                                    m.away_team?.slug,
                                    m.away_team?.title,
                                    m.away_team?.english_name,
                                    m.away_team?.logo,
                                    m.away_team?.thumbnail,
                                    m.away_team?.is_active,
                                    m.away_team?.full_title,
                                    m.away_team?.is_national,
                                    new Country(
                                        m.away_team?.country?.name,
                                        m.away_team?.country?.english_name,
                                        m.away_team?.country?.flag_1x1,
                                        m.away_team?.country?.flag_4x3
                                    )
                                ),
                                m.home_score,
                                m.away_score,
                                new StatusDetails(
                                    m.status_details?.title,
                                    m.status_details?.status_type
                                ),
                                m.holds_at,
                                m.started_at,
                                m.is_active,
                                m.is_postponed,
                                m.is_finished,
                                m.week_number,
                                m.minute,
                                m.slug,
                                m.home_penalty_score,
                                m.away_penalty_score,
                                new RoundType(
                                    m.round_type?.name,
                                    m.round_type?.value,
                                    m.round_type?.is_knockout,
                                    m.round_type?.display_name
                                )
                            ));
                        const matches = new Matches(lastMatches, nextMatches);
                        return new TeamMatchesResponseDTO(true, matches);
                    })
                    .catch(err => {
                        this._logger.error(`${TeamMatchesQuery.name} - error : ${err}`);
                        return new TeamMatchesResponseDTO(false, null, TeamErrors.fetchMatchesException);
                    });
            })
            .catch(err => {
                this._logger.error(`${TeamMatchesQuery.name} - error : ${err}`);
                return new TeamMatchesResponseDTO(false, null, TeamErrors.GetTeamException);
            });
    }
}