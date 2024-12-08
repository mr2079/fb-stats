import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './infrastructure/data/AppDataSource';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    TypeOrmModule.forRoot(AppDataSource.options)
  ],
  controllers: []
})
export class AppModule {}
