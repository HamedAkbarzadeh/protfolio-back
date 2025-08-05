import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/@orm/models/auth/role.entity";
import { Repository } from "typeorm";
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
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
}