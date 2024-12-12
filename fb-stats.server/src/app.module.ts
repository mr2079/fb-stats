import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import InitializeController from './api/controllers/initialize.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from './infrastructure/data/typeorm.module';
import CompetitionController from './api/controllers/competition.controller';
import Football360ApiService from './infrastructure/services/football360-api.service';
import { CqrsModule } from '@nestjs/cqrs';
import CompetitionListQueryHandler from './application/queries/competitions/competition-list.handler';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import CompetitionProfile from './application/mappings/competition.profile';
import CompetitionQueryHandler from './application/queries/competitions/competition.handler';
import CompetitionStandingQueryHandler from './application/queries/competitions/competition-standing.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    TypeOrmModule,
    HttpModule,
    CqrsModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    })
  ],
  controllers: [
    InitializeController,
    CompetitionController
  ],
  providers: [
    CompetitionProfile,
    Football360ApiService,
    CompetitionListQueryHandler,
    CompetitionQueryHandler,
    CompetitionStandingQueryHandler
  ]
})
export class AppModule {}
