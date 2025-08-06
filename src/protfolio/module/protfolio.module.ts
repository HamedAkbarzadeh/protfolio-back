import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtfolioEntity } from 'src/@orm/models/protfolio/protfolio.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProtfolioEntity])
    ],
    providers: [],
    exports: []
})
export class ProtfolioModule { }
