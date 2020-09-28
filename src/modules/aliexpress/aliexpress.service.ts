import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ItemResponse } from './dto/itemResponse';
import { ItemInfo } from './dto/itemInfo.dto';
import { SkuModule } from './dto/skuModule.dto';
import { ProductSKUProperty } from './dto/productSKUProperty.dto';
import { SKUInfo } from './dto/skuInfo.dto';

@Injectable()
export class AliExpressService {
  private browser;

  constructor() {
    puppeteer.launch()
      .then(res => this.browser = res)
      .catch(e => console.log(e));
  }

  private async getData<T>(url: string): Promise<T> {
    const page = await this.browser.newPage();
    await page.goto(url);
    // @ts-ignore
    return page.evaluate(() => runParams);
  }

  public async getItemInfo(id: number): Promise<ItemInfo> {
    const { data } = await this.getData<ItemResponse>(`https://www.aliexpress.com/item/${id}.html`);
    const {
      pageModule,
      titleModule,
      storeModule,
      imageModule,
      skuModule
    } = data;

    return {
      url: pageModule.itemDetailURL,
      title: titleModule.subject,
      productId: pageModule.productId,
      orders: titleModule.tradeCount,
      rating: titleModule.feedbackRating.averageStar,
      reviews: titleModule.feedbackRating.totalValidNum,
      images: (imageModule && imageModule.imagePathList) || [],
      smallImages: (imageModule && imageModule.summImagePathList) || [],
      sku: skuModule.hasSkuProperty ? this.getItemVariants(skuModule) : [],
      store: {
        url: storeModule.storeURL,
        name: storeModule.storeName,
        companyId: storeModule.companyId,
        storeId: storeModule.storeNum,
        followers: storeModule.followingNumber,
        ratingCount: storeModule.positiveNum,
        rating: Number(storeModule.positiveRate.split('%')[0]),
        openingDate: new Date(storeModule.openTime),
        openedYears: storeModule.openedYear,
        topRated: storeModule.topRatedSeller
      },
    };
  }

  private getItemVariants(data: SkuModule): Array<SKUInfo> {
    const priceList = data.skuPriceList;
    const propsList = this.getPropsList(data.productSKUPropertyList);

    const variants = [];
    for (const sku of priceList) {
      if (!sku.skuVal.availQuantity){
        continue;
      }
      variants.push({
        skuId: sku.skuId,
        price: sku.skuVal.skuActivityAmount.value,
        currency: sku.skuVal.skuActivityAmount.currency,
        props: this.getProps(sku.skuPropIds, propsList)
      });
    }

    return variants;
  }

  private getPropsList(data: Array<ProductSKUProperty>): Map<number, string> {
    const props = new Map;
    for (const values of data) {
      for (const sku of values.skuPropertyValues) {
        props.set(sku.propertyValueId, sku.propertyValueName);
      }
    }
    return props;
  }

  private getProps(propIds: string, propsList: Map<number, string>): string {
    return propIds
      .split(',')
      .map(e => propsList.get(Number(e)))
      .join(',');
  }
}
