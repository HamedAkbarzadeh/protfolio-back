import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../@base/base.entity";
import { RoleEntity } from "./role.entity";

@Entity()
export class UserEntity extends BaseEntity {

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => RoleEntity, role => role.users, { nullable: true })
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
    })
    roles: RoleEntity[]
}