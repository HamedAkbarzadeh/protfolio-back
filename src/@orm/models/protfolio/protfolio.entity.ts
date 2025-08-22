import { Column, Entity } from "typeorm";
import { BaseEntity } from "../@base/base.entity";
import { StatusType } from "../index.enum";

@Entity()
export class ProtfolioEntity extends BaseEntity {
    @Column()
    title: string;

    @Column({ nullable: true })
    description: string

    @Column()
    image: string

    @Column()
    link: string

    @Column({ enum: ['ACTIVE', 'INACTIVE'] , default : "ACTIVE" })
    status: StatusType

}