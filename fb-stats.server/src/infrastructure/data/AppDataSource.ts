import Competition from "src/domain/entities/competition.entity";
import Team from "src/domain/entities/team.entity";
import { DataSource } from "typeorm";
import { UpdateSchema1733681272052 } from "../migrations/1733681272052-UpdateSchema";

const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "fb_stats",
    synchronize: true,
    entities: [`${__dirname}/../../domain/entities/*.{j,t}s`],
    migrations: [`${__dirname}/../migrations/*.{j,t}s`],
    // entities: [
    //     Competition,
    //     Team
    // ],
    // migrations: [
    //     UpdateSchema1733681272052
    // ]
});

export default appDataSource;