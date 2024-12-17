import { Module } from "@nestjs/common";
import CompetitionListQueryHandler from "./queries/competitions/competition-list.handler";
import CompetitionQueryHandler from "./queries/competitions/competition.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import CompetitionProfile from "./mappings/competition.profile";
import { InfrastructurModule } from "src/infrastructure/infrastructure.module";
import CompetitionStandingQueryHandler from "./queries/competitions/competition-standing.handler";
import TeamMatchesQueryHandler from "./queries/teams/team-matches.handler";

@Module({
    imports: [
        CqrsModule,
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
        InfrastructurModule
    ],
    providers: [
        CompetitionProfile,
        CompetitionListQueryHandler,
        CompetitionQueryHandler,
        CompetitionStandingQueryHandler,
        TeamMatchesQueryHandler
    ],
    exports: [
        CqrsModule,
        InfrastructurModule
    ],
})
export class ApplicationModule { }