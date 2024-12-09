import Competition from "src/domain/entities/competition.entity";
import Team from "src/domain/entities/team.entity";
import { DataSource } from "typeorm";
import { UpdateSchema1733769376592 } from "../migrations/1733769376592-UpdateSchema";

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
        UpdateSchema1733769376592
    ]
});

export default appDataSource;