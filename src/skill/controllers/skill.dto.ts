import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SkillStatus } from "../types/skill.constansts";

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    rait: number

    @IsEnum(SkillStatus)
    @IsNotEmpty()
    status: string
}

