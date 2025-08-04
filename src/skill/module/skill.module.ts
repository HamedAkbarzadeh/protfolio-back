import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from 'src/@orm/models/skill/skill.entity';
import { SkillController } from '../controllers/skill.controller';
import { SkillService } from '../controllers/skill.service';
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SkillEntity])
    ],
    controllers: [SkillController],
    providers: [
        SkillService,
        I18nBaseService
    ]
})
export class SkillModule { }
