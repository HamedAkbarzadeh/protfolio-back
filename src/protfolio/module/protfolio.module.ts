import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtfolioEntity } from 'src/@orm/models/protfolio/protfolio.entity';
import { ProtfolioController } from '../controllers/protfolio.controller';
import { ProtfolioService } from '../controllers/protfolio.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProtfolioEntity])
    ],
    controllers: [ProtfolioController],
    providers: [ProtfolioService],
    exports: []
})
export class ProtfolioModule {}
