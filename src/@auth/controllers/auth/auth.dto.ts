import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleEntity } from "src/@orm/models/auth/role.entity";

export class SignInDto {
    @IsString()
    @IsOptional()
    first_name: string;

    @IsString()
    @IsOptional()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsArray()
    @IsOptional()
    @IsInt({ each: true })
    roles: RoleEntity[]
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string    
}