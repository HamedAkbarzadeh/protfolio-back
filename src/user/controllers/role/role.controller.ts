import { RoleService } from './role.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
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

    @Patch('attach/user/:userId/role/:roleId')
    attachRoleToUser(@Param() param: { userId: string, roleId: string }) {
        return this.roleService.attachRole(+param.roleId, +param.userId);
    }

    @Patch('detach/user/:userId/role/:roleId')
    detachRoleFromUser(@Param() param: { userId: string, roleId: string }) {
        return this.roleService.detachRole(+param.roleId, +param.userId);
    }

    @Delete('delete/:roleId')
    deleteRole(@Param('roleId') roleId: string) {
        return this.roleService.deleteRole(+roleId);
    }
}