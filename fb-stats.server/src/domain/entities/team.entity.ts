import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "./base.entity";
import Competition from "./competition.entity";

@Entity()
export default class Team extends BaseEntity {
    @Column()
    fetchId: string;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    logo: string;

    @Column()
    competitionId: number;

    @ManyToOne(() => Competition, (competition) => competition.teams)
    competition: Competition
}