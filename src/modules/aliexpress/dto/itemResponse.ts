import { TitleModule } from './titleModule.dto';
import { StoreModule } from './storeModule.dto';
import { SkuModule } from './skuModule.dto';
import { ImageModule } from './imageModule.dto';
import { CouponModule } from './couponModule.dto';
import { PriceModule } from './priceModule.dto';

export class ItemResponse {
  data: {
    titleModule: TitleModule;
    storeModule: StoreModule;
    imageModule: ImageModule;
    skuModule: SkuModule;
    couponModule: CouponModule;
    priceModule: PriceModule;
  }
}
