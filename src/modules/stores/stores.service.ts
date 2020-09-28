import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Store } from '../../models/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreInfo } from '../aliexpress/dto/storeInfo.dto';

@Injectable()
export class StoresService extends TypeOrmCrudService<Store>{
  constructor(@InjectRepository(Store) repo: Repository<Store>) {
    super(repo);
  }
  async save(data: StoreInfo): Promise<Store> {
    let store = await this.repo.findOne({
      where: {
        storeId: data.storeId
      }
    });

    if (!store) {
      store = await this.repo.save(data);
    } else if(data.followers !== store.followers ||
      data.openedYears !== store.openedYears ||
      data.rating !== store.rating ||
      data.ratingCount !== store.ratingCount ||
      data.topRated !== store.topRated) {
      const updatedStore = this.repo.merge(store, data);
      store = await this.repo.save(updatedStore);
    }

    return store;
  }
}
