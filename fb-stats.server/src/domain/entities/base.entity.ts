import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export default class AppBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;
}