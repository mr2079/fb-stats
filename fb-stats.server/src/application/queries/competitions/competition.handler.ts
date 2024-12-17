import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import CompetitionResponseDTO from "src/application/models/dtos/responses/competition-response.dto";
import { CompetitionErrors } from "src/application/models/errors/competition.error";
import Competition from "src/domain/entities/competition.entity";
import { DataSource, Repository } from "typeorm";

export class CompetitionQuery {
    constructor(
        public id: number
    ) { }
}

@QueryHandler(CompetitionQuery)
export default class CompetitionQueryHandler implements IQueryHandler<CompetitionQuery> {
    private readonly _competitionRepository: Repository<Competition>;
    private readonly _logger = new Logger();

    constructor(
        _appDataSource: DataSource
    ) {
        this._competitionRepository = _appDataSource.getRepository(Competition);
    }

    async execute(query: CompetitionQuery) : Promise<CompetitionResponseDTO> {
        return this._competitionRepository.findOne({
            where: {
                id: query.id
            }
        })
        .then(competition => {
            return new CompetitionResponseDTO(true, competition);
        })
        .catch(err => {
            this._logger.error(`${CompetitionQuery.name} - error : ${err}`);
            return new CompetitionResponseDTO(false, null, CompetitionErrors.fetchAllException);
        });
    }
}