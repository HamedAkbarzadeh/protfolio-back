import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from 'src/@orm/models/skill/skill.entity';
import { SkillController } from '../controllers/skill.controller';
import { SkillService } from '../controllers/skill.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SkillEntity])
    ],
    controllers: [SkillController],
    providers: [SkillService]
})
export class SkillModule { }
