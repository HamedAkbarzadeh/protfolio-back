import { Module } from '@nestjs/common';
import { ContactController } from '../controllers/contact.controller';
import { ContactService } from '../controllers/contact.service';
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from 'src/@orm/models/contact/contact.entity';

@Module({
    controllers: [ContactController],
    providers: [I18nBaseService, ContactService],
    imports: [
        TypeOrmModule.forFeature([ContactEntity])
    ]
})
export class ContactModule { }
