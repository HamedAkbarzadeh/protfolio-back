import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSkillDto } from './skill.dto';
import { SkillService } from './skill.service';

@Controller()
export class SkillController {

    constructor(private skillService: SkillService) { }
    @Get()
    getAll() {
        return this.skillService.getAll()
    }

    @Post('create')
    addSkill(@Body() data: CreateSkillDto) {
        return this.skillService.create(data)
    }

    @Delete()
    remove(@Param('id') id: number) {
        return this.skillService.removeSkill(id)
    }
}
