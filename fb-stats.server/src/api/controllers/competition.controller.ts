import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiParam } from "@nestjs/swagger";
import IResponse from "src/application/models/dtos/responses/response.interface";
import { CompetitionListQuery } from "src/application/queries/competitions/competition-list.handler";
import { CompetitionStandingQuery } from "src/application/queries/competitions/competition-standing.handler";
import { CompetitionQuery } from "src/application/queries/competitions/competition.handler";

@Controller("api/v1/competitions")
export default class CompetitionController {
    constructor(
        private readonly _queryBus : QueryBus
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
    async fetchStandingAsync(@Param() { id }: { id: number }) : Promise<IResponse> {
        return this._queryBus.execute(new CompetitionStandingQuery(id));
    }
}