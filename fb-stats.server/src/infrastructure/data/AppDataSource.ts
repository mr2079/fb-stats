import Competition from "src/domain/entities/competition.entity";
import Team from "src/domain/entities/team.entity";
import { DataSource } from "typeorm";
import { UpdateSchema1733919538853 } from "../migrations/1733919538853-UpdateSchema";

const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "fb_stats",
    synchronize: true,
    entities: [
        Competition,
        Team
    ],
    migrations: [
        UpdateSchema1733919538853
    ]
});

export default appDataSource;