import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "./base.entity";
import Team from "./team.entity";

@Entity()
export default class Competition extends BaseEntity {
    @Column()
    fetchId: string;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    logo: string;

    @OneToMany(() => Team, (team) => team.competition)
    teams: Team[];
}