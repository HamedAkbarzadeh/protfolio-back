import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../@base/base.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class RoleEntity extends BaseEntity {
    @Column()
    name: string

    @ManyToMany(() => UserEntity, user => user.roles)
    users: UserEntity[]
}