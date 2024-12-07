import { Column, Model, PrimaryKey } from "sequelize-typescript";

export default class BaseEntity extends Model {
    @PrimaryKey
    @Column
    id : number;
}