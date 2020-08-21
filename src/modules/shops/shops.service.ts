import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Shop } from '../../models/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopsService extends TypeOrmCrudService<Shop>{
  constructor(@InjectRepository(Shop) repo) {
    super(repo);
  }
}
