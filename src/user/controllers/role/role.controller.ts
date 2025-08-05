import { RoleService } from './role.service';
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/@auth/types/guards/auth.guard";
import { RoleCreateDto } from "./role.dto";

@UseGuards(AuthGuard)
@Controller('roles')
export class RoleController {

    constructor(private roleService: RoleService) { }

    @Get()
    findAll() {
        return this.roleService.findAll()
    }

    @Post('create')
    addRole(@Body() data: RoleCreateDto) {
        return this.roleService.create(data.name)
    }
}