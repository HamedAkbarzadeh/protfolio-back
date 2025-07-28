import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSkillDto } from './skill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {

    constructor(private skillService: SkillService) { }
    @Get()
    getAll() {
        return 'get all'
    }

    @Post('create')
    addSkill(@Body() data: CreateSkillDto) {
        return this.skillService.create(data)
    }
}
