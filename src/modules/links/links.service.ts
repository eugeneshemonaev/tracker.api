import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Link } from '../../models/link.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LinksService extends TypeOrmCrudService<Link>{
  constructor(@InjectRepository(Link) repo) {
    super(repo);
  }
}
