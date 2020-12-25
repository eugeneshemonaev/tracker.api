import { StoreInfo } from './storeInfo.dto';
import { SKUInfo } from './skuInfo.dto';
import { FixedDiscountLevel } from './fixedDiscountLevel.dto';
import { BasicItemInfo } from './basicItemInfo.dto';

export class ItemInfo extends BasicItemInfo {
  categoryId: number;
  sellerAdminSeq: number;
  orders: number;
  reviews: number;
  smallImages: Array<string>;
  sku: Array<SKUInfo>;
  store: StoreInfo;
  discounts: FixedDiscountLevel[];
}
