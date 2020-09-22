import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Store } from '../../models/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService extends TypeOrmCrudService<Store>{
  constructor(@InjectRepository(Store) repo: Repository<Store>) {
    super(repo);
  }
}
