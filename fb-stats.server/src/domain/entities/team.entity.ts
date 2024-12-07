import { BelongsToMany, Column, Table } from "sequelize-typescript";
import BaseEntity from "./base.entity";
import Competition from "./competition.entity";
import CompetitionTeam from "./competition-team.entity";

@Table({ tableName: "teams" })
export default class Team extends BaseEntity {
    @Column
    fetchId: string;

    @Column
    name: string;

    @Column
    title: string;

    @Column
    logo: string;

    @BelongsToMany(() => Competition, () => CompetitionTeam)
    competitions: Array<Competition & { CompetitionTeam: CompetitionTeam }>;
}