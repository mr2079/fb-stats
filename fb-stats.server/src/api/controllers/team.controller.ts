import { Controller, Get, Param } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiParam } from "@nestjs/swagger";
import IResponse from "src/application/models/dtos/responses/response.interface";
import { TeamMatchesQuery } from "src/application/queries/teams/team-matches.handler";

@Controller("api/v1/teams")
export default class TeamController {
    constructor(
        private readonly _queryBus : QueryBus
    ) { }

    @Get(":name/matches")
    @ApiParam({
        name: "name",
        type: "string"
    })
    async fetchMatchesAsync(@Param() { name }: { name: string }) : Promise<IResponse> {
        return this._queryBus.execute(new TeamMatchesQuery(name));
    }
}