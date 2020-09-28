import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Item } from '../../models/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AliExpressService } from '../aliexpress/aliexpress.service';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class ItemsService extends TypeOrmCrudService<Item> {
  constructor(@InjectRepository(Item) repo: Repository<Item>,
              private readonly storesService: StoresService,
              private readonly aliService: AliExpressService) {
    super(repo);
  }

  async save(data): Promise<void> {
    const itemInfo = await this.aliService.getItemInfo(data.id);
    const store = await this.storesService.save(itemInfo.store);

    for (let skuInfo of itemInfo.sku) {
      const item = await this.repo.findOne({
        where: {
          productId: itemInfo.productId,
          skuId: skuInfo.skuId,
        },
      });

      if (!item) {
        await this.repo.save({
          ...itemInfo,
          ...skuInfo,
          store,
        });
      } else if (item.price !== skuInfo.price) {
        item.price = skuInfo.price;
        await this.repo.save(item);
      }
    }
  }
}
