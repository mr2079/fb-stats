import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigModule } from './infrastructure/config/sequelize-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ ".env.development", ".env.production" ]
    }),
    SequelizeConfigModule.forRoot([])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
