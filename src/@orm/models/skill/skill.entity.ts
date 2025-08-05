import { Column, Entity } from "typeorm";
import { BaseEntity } from "../@base/base.entity";
import { StatusType } from "../index.enum";

@Entity()
export class SkillEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    rait: number

    @Column({ enum: ['ACTIVE', 'INACTIVE'] })
    status: StatusType
}