import { ProductSKUProperty } from './productSKUProperty.dto';
import { SKUPrice } from './skuPrice.dto';

export class SkuModule {
  hasSkuProperty: boolean;
  skuPriceList: Array<SKUPrice>;
  productSKUPropertyList: Array<ProductSKUProperty>;
}
