import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from '../../models/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  controllers: [LinksController]
})
export class LinksModule {}
