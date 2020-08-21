import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Brand } from '../../models/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService extends TypeOrmCrudService<Brand>{
  constructor(@InjectRepository(Brand) repo) {
    super(repo);
  }
}
