import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../models/item.entity';
import { StoresModule } from '../stores/stores.module';
import { AliExpressModule } from '../aliexpress/aliexpress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    StoresModule,
    AliExpressModule
  ],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
