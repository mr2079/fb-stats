import { Column, Entity, OneToMany } from "typeorm";
import AppBaseEntity from "./base.entity";
import Team from "./team.entity";

@Entity()
export default class Competition extends AppBaseEntity {
    @Column()
    fetchId: string;

    @Column({ default: 0 })
    order: number;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column()
    logo: string;

    @Column({ default: false })
    isActive: boolean;

    @OneToMany(() => Team, (team) => team.competition)
    teams: Team[];
}