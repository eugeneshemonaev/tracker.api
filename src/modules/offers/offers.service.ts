import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Offer } from '../../models/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AliExpressService } from '../aliexpress/aliexpress.service';
import { StoresService } from '../stores/stores.service';
import { SearchConditionsDto } from '../aliexpress/dto/searchConditions.dto';
import { ListItem } from '../aliexpress/dto/listItem';
import { BasicItemInfo } from '../aliexpress/dto/basicItemInfo.dto';

@Injectable()
export class OffersService extends TypeOrmCrudService<Offer> {
  constructor(@InjectRepository(Offer) repo: Repository<Offer>,
              private readonly storesService: StoresService,
              private readonly aliService: AliExpressService) {
    super(repo);
  }

  async save(data): Promise<void> {
    const offerInfo = await this.aliService.getItemInfo(data.id);
    const store = await this.storesService.save(offerInfo.store);

    for (const skuInfo of offerInfo.sku) {
      const offer = await this.repo.findOne({
        where: {
          productId: offerInfo.productId,
          skuId: skuInfo.skuId,
        },
      });

      if (!offer) {
        await this.repo.save({
          ...offerInfo,
          ...skuInfo,
          store,
        });
      } else if (offer.price !== skuInfo.price) {
        offer.price = skuInfo.price;
        await this.repo.save(offer);
      }
    }
  }

  async search(query: SearchConditionsDto): Promise<BasicItemInfo[]> {
    return this.aliService.searchItems(query);
  }
}
