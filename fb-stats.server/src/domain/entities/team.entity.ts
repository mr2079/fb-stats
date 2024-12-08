import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
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

    @ManyToMany(() => Competition, (competition) => competition.teams)
    @JoinTable()
    competitions: Competition[]
}