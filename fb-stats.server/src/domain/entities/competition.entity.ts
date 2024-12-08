import { Column, Entity, ManyToMany } from "typeorm";
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

    @ManyToMany(() => Team, (team) => team.competitions)
    teams: Team[];
}