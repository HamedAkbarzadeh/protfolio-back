import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SkillStatus } from "../types/skill.constansts";
import { StatusType } from "src/@orm/models/index.enum";

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    rait: number

    @IsEnum(StatusType)
    @IsOptional()
    status: StatusType
}

