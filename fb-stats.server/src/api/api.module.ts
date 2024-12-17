import { Module } from "@nestjs/common";
import InitializeController from "./controllers/initialize.controller";
import CompetitionController from "./controllers/competition.controller";
import { ConfigModule } from "@nestjs/config";
import { ApplicationModule } from "src/application/application.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [ ".env.development", ".env.production" ]
        }),
        ApplicationModule
    ],
    controllers: [
        InitializeController,
        CompetitionController
    ]
})
export class ApiModule { }