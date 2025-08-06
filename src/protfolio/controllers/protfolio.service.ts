import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProtfolioEntity } from "src/@orm/models/protfolio/protfolio.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProtfolioService {
    constructor(@InjectRepository(ProtfolioEntity) private protfolioRepo: Repository<ProtfolioEntity>) { }

    getAll() {
        return this.protfolioRepo.find();
    }

    create(data: Partial<ProtfolioEntity>) {
        const newProtfolio = this.protfolioRepo.create(data);
        return this.protfolioRepo.save(newProtfolio);
    }

    delete(id: number) {
        return this.protfolioRepo.delete(id);
    }

    update(id: number, data: Partial<ProtfolioEntity>) {
        return this.protfolioRepo.update(id, data);
    }
    findOne(id: number) {
        return this.protfolioRepo.findOneBy({ id });
    }
}