import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/@auth/types/guards/auth.guard";

@Controller('roles')
export class RoleController {

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return "HI"
    }
}