import { IsNotEmpty, IsString } from "class-validator";

export class ContactReq {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    phone_number: string

    @IsString()
    @IsNotEmpty()
    message: string
}