import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import InitializeController from './api/controllers/initialize.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from './infrastructure/data/typeorm.module';
import CompetitionController from './api/controllers/competition.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    TypeOrmModule,
    HttpModule,
    CqrsModule
  ],
  controllers: [
    InitializeController,
    CompetitionController
  ]
})
export class AppModule {}
