import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Category } from '../../models/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category>{
  constructor(@InjectRepository(Category) repo) {
    super(repo);
  }
}
