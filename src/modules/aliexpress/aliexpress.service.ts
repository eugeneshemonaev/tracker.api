import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ItemResponse } from './dto/itemResponse';

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

  public async getItemInfo(id: number) {
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
      averageStar: titleModule.feedbackRating.averageStar,
      totalStartCount: titleModule.feedbackRating.totalValidNum,
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
        rating: storeModule.positiveRate,
        openingDate: storeModule.openTime,
        openedYears: storeModule.openedYear,
        topRated: storeModule.topRatedSeller
      },
    };
  }

  private getItemVariants(data): Array<Record<any, any>> {
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
        props: this.getProps(sku.skuVal.skuPropIds, propsList)
      });
    }

    return variants;
  }

  private getPropsList(data): Map<number, string> {
    const props = new Map;
    for (const prop of data) {
      props.set(prop.propertyValueId, prop.propertyValueName);
    }
    return props;
  }

  private getProps(propIds: string, propsList: Map<number, string>) {
    return propIds
      .split(',')
      .map(e => propsList.get(Number(e)))
      .join(',');
  }
}
