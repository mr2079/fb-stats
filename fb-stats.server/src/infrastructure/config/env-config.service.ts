import { ConfigService } from "@nestjs/config";
import IDbConfig from "./db-config.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EnvConfigService implements IDbConfig {
    constructor(private _configService : ConfigService) { }

    getDbHost(): string {
        return this._configService.get<string>("DB_HOST");
    }
    getDbPort(): number {
        return this._configService.get<number>("DB_PORT");
    }
    getDbName(): string {
        return this._configService.get<string>("DB_NAME");
    }
    getDbUserName(): string {
        return this._configService.get<string>("DB_USERNAME");
    }
    getDbPassword(): string {
        return this._configService.get<string>("DB_PASSWORD");
    }
}