import { BelongsTo, Column, ForeignKey, Table } from "sequelize-typescript";
import BaseEntity from "./base.entity";
import Competition from "./competition.entity";
import Team from "./team.entity";

@Table({ tableName: "competition_teams" })
export default class CompetitionTeam extends BaseEntity {
    @ForeignKey(() => Competition)
    @Column
    competitionId: number;
    
    @ForeignKey(() => Team)
    @Column
    teamId: number;
}