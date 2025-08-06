import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/@orm/models/auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {


    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) { }

    findOneById(id: number) {
        return this.userRepo.findOne({ where: { id } });
    }

    findAll() {
        return this.userRepo.find();
    }
}


