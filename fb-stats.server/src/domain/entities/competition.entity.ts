import { BelongsToMany, Column, Table } from "sequelize-typescript";
import BaseEntity from "./base.entity";
import Team from "./team.entity";
import CompetitionTeam from "./competition-team.entity";

@Table({ tableName: "competitions" })
export default class Competition extends BaseEntity {
    @Column
    fetchId: string;

    @Column
    name: string;

    @Column
    title: string;

    @Column
    logo: string;

    @BelongsToMany(() => Team, () => CompetitionTeam)
    teams: Array<Team & { CompetitionTeam: CompetitionTeam }>;
}