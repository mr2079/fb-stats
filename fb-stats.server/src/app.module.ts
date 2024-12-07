import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Competition from './domain/entities/competition.entity';
import Team from './domain/entities/team.entity';
import CompetitionTeam from './domain/entities/competition-team.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        Competition,
        Team,
        CompetitionTeam
      ]
    })
  ],
  controllers: []
})
export class AppModule {}
