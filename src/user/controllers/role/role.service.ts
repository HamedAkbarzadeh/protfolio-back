import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/@orm/models/auth/role.entity";
import { Repository } from "typeorm";
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';
import { UserEntity } from "src/@orm/models/auth/user.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private readonly i18n: I18nBaseService
    ) { }


    async create(name: string) {
        let roleObj = this.roleRepo.create({
            name
        })
        const role = await this.roleRepo.save(roleObj);
        if (!role)
            throw new HttpException(String(this.i18n.t('messages.error_in_db')), HttpStatus.BAD_GATEWAY)
        return role;
    }


    findAll() {
        return this.roleRepo.find()
    }

    async attachRole(roleId: number, userId: number) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['roles'] });
        if (!user) {
            throw new HttpException(String(this.i18n.t('messages.user_not_found')), HttpStatus.NOT_FOUND);
        }
        const role = await this.roleRepo.findOne({ where: { id: roleId } });
        if (!role) {
            throw new HttpException(String(this.i18n.t('messages.role_not_found')), HttpStatus.NOT_FOUND);
        }
        if (user.roles.some(r => r.id === roleId)) {
            throw new HttpException(String(this.i18n.t('messages.role_already_assigned')), HttpStatus.BAD_REQUEST);
        }
        user.roles.push(role);
        const updatedUser = await this.userRepo.save(user);
        if (!updatedUser) {
            throw new HttpException(String(this.i18n.t('messages.error_in_db')), HttpStatus.BAD_GATEWAY);
        }
        return updatedUser;
    }

    async detachRole(roleId: number, userId: number) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['roles'] });
        if (!user) {
            throw new HttpException(String(this.i18n.t('messages.user_not_found')), HttpStatus.NOT_FOUND);
        }
        const roleIndex = user.roles.findIndex(r => r.id === roleId);
        if (roleIndex === -1) {
            throw new HttpException(String(this.i18n.t('messages.role_not_assigned')), HttpStatus.BAD_REQUEST);
        }
        user.roles.splice(roleIndex, 1);
        const updatedUser = await this.userRepo.save(user);
        if (!updatedUser) {
            throw new HttpException(String(this.i18n.t('messages.error_in_db')), HttpStatus.BAD_GATEWAY);
        }
        return updatedUser;
    }

    async deleteRole(roleId: number) {
        const role = await this.roleRepo.findOne({ where: { id: roleId } });
        if (!role) {
            throw new HttpException(String(this.i18n.t('messages.role_not_found')), HttpStatus.NOT_FOUND);
        }
        const deletedRole = await this.roleRepo.remove(role);
        if (!deletedRole) {
            throw new HttpException(String(this.i18n.t('messages.error_in_db')), HttpStatus.BAD_GATEWAY);
        }
        return deletedRole;
    }
}