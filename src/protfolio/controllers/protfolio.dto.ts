import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProtfolioCreateDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    @IsString()
    link: string


    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}