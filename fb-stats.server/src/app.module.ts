import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appDataSource from './infrastructure/data/AppDataSource';
import InitializeController from './initialize.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    TypeOrmModule.forRoot(appDataSource.options),
    HttpModule
  ],
  controllers: [
    InitializeController
  ]
})
export class AppModule {}
