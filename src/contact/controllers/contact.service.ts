import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from 'src/@orm/models/contact/contact.entity';
import { Repository } from 'typeorm';
import { ContactReq } from './contact.dto';
import { I18nBaseService } from 'src/@shere/services/i18n-Service/i18n.service';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(ContactEntity) private contactRepo: Repository<ContactEntity>,
        private readonly i18n: I18nBaseService
    ) { }

    getAll() {
        return this.contactRepo.find()
    }
    finOne(id: number) {
        return this.contactRepo.findOneBy({ id })
    }
    create(data: ContactReq) {
        const contact = this.contactRepo.save(data)
        if (!contact)
            throw new HttpException(String(this.i18n.t('messages.error_in_db')), HttpStatus.BAD_GATEWAY)
        return contact
    }
}
