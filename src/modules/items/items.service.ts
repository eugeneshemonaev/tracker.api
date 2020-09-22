import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Item } from '../../models/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService extends TypeOrmCrudService<Item>{
  constructor(@InjectRepository(Item) repo: Repository<Item>) {
    super(repo);
  }
}
