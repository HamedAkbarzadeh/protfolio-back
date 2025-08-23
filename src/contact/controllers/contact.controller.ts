import { TransformInterceptor } from 'src/@core/service/interceptor/transform.interceptor';
import { ContactReq } from './contact.dto';
import { ContactService } from './contact.service';
import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';

@Controller()
@UseInterceptors(TransformInterceptor)
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    getAll() {
        return this.contactService.getAll()
    }
    @Get('/:id')
    findOne(@Param('id') id: number) {
        return this.contactService.finOne(id)
    }
    @Post('create')
    create(@Body() data: ContactReq) {
        return this.contactService.create(data)
    }
}
