import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import Competition from "src/domain/entities/competition.entity";
import { DataSource, Repository } from "typeorm";

export class CompetitionListQuery implements IQuery { }

@QueryHandler(CompetitionListQuery)
export default class CompetitionListQueryHandler implements IQueryHandler<CompetitionListQuery> {
    private readonly _competitionRepository: Repository<Competition>;

    constructor(
        private readonly _appDataSource: DataSource
    ) {
        this._competitionRepository = _appDataSource.getRepository(Competition);
    }

    execute(_: CompetitionListQuery): Promise<any> {
        throw new Error("Method not implemented.");
    }
}