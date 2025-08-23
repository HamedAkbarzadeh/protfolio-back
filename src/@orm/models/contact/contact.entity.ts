import { Column, Entity } from "typeorm";
import { BaseEntity } from "../@base/base.entity";

@Entity()
export class ContactEntity extends BaseEntity {
    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    phone_number: string;

    @Column({ unique: true })
    email: string;

    @Column()
    message: string;
}