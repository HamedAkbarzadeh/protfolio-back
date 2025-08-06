import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProtfolioService } from "./protfolio.service";
import { ProtfolioCreateDto } from "./protfolio.dto";


@Controller()
export class ProtfolioController {

    constructor(private readonly protfolioService: ProtfolioService) { }

    @Get()
    getAll() {
        return this.protfolioService.getAll();
    }

    @Get(':id')
    getById(id: string) {
        return this.protfolioService.findOne(+id);
    }

    @Delete(':id')
    deleteById(@Param('id', ParseIntPipe) id: string) {
        return this.protfolioService.delete(+id);
    }

    @Put(':id')
    updateById(@Param('id', ParseIntPipe) id: string, @Body() body: any) {
        return this.protfolioService.update(+id, body);
    }

    @Post()
    create(@Body() body: ProtfolioCreateDto) {
        return this.protfolioService.create(body);
    }
}