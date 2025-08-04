import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from 'src/@orm/models/skill/skill.entity';
import { Repository } from 'typeorm';
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(SkillEntity) private skillRepo: Repository<SkillEntity>,
        private readonly i18n: I18nBaseService
    ) { }


    getAll() {
        return this.skillRepo.find()
    }

    async create(data: CreateSkillDto) {
        const skill = await this.skillRepo.save(data);
        if (!skill)
            throw new HttpException(String(this.i18n.t('messages.error_in_db')), HttpStatus.BAD_GATEWAY)
        return skill;
    }

    removeSkill(id: number) {
        return this.skillRepo.delete(id)
    }
}
