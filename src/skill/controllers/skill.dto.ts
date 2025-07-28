import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    rait: number
}