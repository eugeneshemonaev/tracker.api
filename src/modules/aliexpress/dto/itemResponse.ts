import { PageModule } from './pageModule.dto';
import { TitleModule } from './titleModule.dto';
import { StoreModule } from './storeModule.dto';
import { SkuModule } from './skuModule.dto';
import { ImageModule } from './imageModule.dto';

export class ItemResponse {
  data: {
    pageModule: PageModule;
    titleModule: TitleModule;
    storeModule: StoreModule;
    imageModule: ImageModule;
    skuModule: SkuModule;
  }
}
