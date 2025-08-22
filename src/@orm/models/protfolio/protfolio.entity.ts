import { Column, Entity } from "typeorm";
import { BaseEntity } from "../@base/base.entity";

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

    @Column({ default: false })
    status: boolean;

}