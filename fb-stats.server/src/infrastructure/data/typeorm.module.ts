import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import appDataSource from "./AppDataSource";

@Global()
@Module({
    providers: [{
        provide: DataSource,
        useFactory: async () => {
            try {
                await appDataSource.initialize();
                return appDataSource;
            } catch (error) {
                throw error;
            }
        }
    }],
    exports: [DataSource]
})
export class TypeOrmModule {}