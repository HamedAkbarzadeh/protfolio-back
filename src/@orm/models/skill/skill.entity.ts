import { Column, Entity } from "typeorm";
import { BaseEntity } from "../@base/base.entity";

@Entity()
export class SkillEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    rait: number

    @Column({ enum: ['ACTIVE', 'INACTIVE'] })
    status: string
}