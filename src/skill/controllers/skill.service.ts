import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillEntity } from 'src/@orm/models/skill/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
    constructor(@InjectRepository(SkillEntity) private skillRepo: Repository<SkillEntity>) { }


    getAll() {
        return this.skillRepo.find()
    }

    async create(data: CreateSkillDto) {
        const skill = await this.skillRepo.save(data);
        if (!skill)
            throw new HttpException("db error", HttpStatus.BAD_GATEWAY)
        return skill;
    }
}
