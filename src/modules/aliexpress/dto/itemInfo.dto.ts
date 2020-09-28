import { StoreInfo } from './storeInfo.dto';
import { SKUInfo } from './skuInfo.dto';

export class ItemInfo {
  url: string;
  title: string;
  productId: number;
  orders: number;
  rating: number;
  reviews: number;
  images: Array<string>;
  smallImages: Array<string>;
  sku: Array<SKUInfo>;
  store: StoreInfo
}