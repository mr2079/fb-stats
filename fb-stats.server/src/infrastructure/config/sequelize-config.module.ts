import { DynamicModule, Module } from "@nestjs/common";
import { EnvConfigService } from "./env-config.service";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";

const sequelizeModuleOptions = (
    config: EnvConfigService,
    entities: any[]
    ) : SequelizeModuleOptions => ({
        dialect: "postgres",
        host: config.getDbHost(),
        port: config.getDbPort(),
        username: config.getDbUserName(),
        password: config.getDbPassword(),
        database: config.getDbName(),
        models: entities
    });

@Module({})
export class SequelizeConfigModule {
    static forRoot(entities = []) : DynamicModule {
        return {
            module: SequelizeConfigModule,
            imports: [
                SequelizeModule.forRootAsync({
                    imports: [EnvConfigService],
                    inject: [EnvConfigService],
                    useFactory: (config: EnvConfigService) => 
                        sequelizeModuleOptions(config, entities)
                })
            ],
            providers: [EnvConfigService],
            exports: [EnvConfigService]
        }
    }
}