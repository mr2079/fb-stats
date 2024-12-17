import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import appDataSource from "./data/AppDataSource";
import { HttpModule } from "@nestjs/axios";
import Football360ApiService from "./services/football360-api.service";

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        {
            provide: DataSource,
            useFactory: async () => {
                try {
                    await appDataSource.initialize();
                    return appDataSource;
                } catch (error) {
                    throw error;
                }
            }
        },
        Football360ApiService
    ],
    exports: [
        DataSource,
        Football360ApiService
    ]
})
export class InfrastructurModule { }