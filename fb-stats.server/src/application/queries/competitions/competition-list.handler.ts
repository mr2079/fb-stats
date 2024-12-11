import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CompetitionErrors } from "src/application/models/errors/competition.error";
import CompetitionListResponseDTO from "src/application/models/dtos/responses/competition-list-response.dto";
import Competition from "src/domain/entities/competition.entity";
import { DataSource, Repository } from "typeorm";

export class CompetitionListQuery { }

@QueryHandler(CompetitionListQuery)
export default class CompetitionListQueryHandler implements IQueryHandler<CompetitionListQuery> {
    private readonly _competitionRepository: Repository<Competition>;
    private readonly _logger = new Logger();

    constructor(
        private readonly _appDataSource: DataSource
    ) {
        this._competitionRepository = _appDataSource.getRepository(Competition);
    }

    async execute(_: CompetitionListQuery) {
        return this._competitionRepository.find({
            where: {
                isActive: true
            },
            order: {
                order: "ASC"
            }
        })
        .then(competitions => {
            return new CompetitionListResponseDTO(true, competitions);
        })
        .catch(err => {
            this._logger.error(`${CompetitionListQuery.name} - error : ${err}`);
            return new CompetitionListResponseDTO(false, null, CompetitionErrors.fetchAllException);
        });
    }
}