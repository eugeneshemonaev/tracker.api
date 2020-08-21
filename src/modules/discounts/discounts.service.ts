import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Discount } from '../../models/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountsService extends TypeOrmCrudService<Discount>{
  constructor(@InjectRepository(Discount) repo) {
    super(repo);
  }
}
