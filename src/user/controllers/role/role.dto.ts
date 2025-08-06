import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserModule } from "src/user/module/user.module";

export class RoleCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
