import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProtfolioCreateDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsNotEmpty()
    @IsString()
    link: string

    @IsOptional()
    @IsString({ each: true })
    tags: string[];

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}