import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import InitializeController from './initialize.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from './infrastructure/data/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    TypeOrmModule,
    HttpModule
  ],
  controllers: [
    InitializeController
  ]
})
export class AppModule {}
