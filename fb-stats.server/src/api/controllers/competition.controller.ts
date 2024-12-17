import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiParam } from "@nestjs/swagger";
import IResponse from "src/application/models/dtos/responses/response.interface";
import { CompetitionListQuery } from "src/application/queries/competitions/competition-list.handler";
import { CompetitionStandingQuery } from "src/application/queries/competitions/competition-standing.handler";
import { CompetitionQuery } from "src/application/queries/competitions/competition.handler";
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

    @Get(":id/standing")
    @ApiParam({
        name: "id",
        type: "number"
    })
    async fetchStandingsAsync(@Param() { id }: { id: number }) : Promise<IResponse> {
        return this._queryBus.execute(new CompetitionStandingQuery(id));
    }
}