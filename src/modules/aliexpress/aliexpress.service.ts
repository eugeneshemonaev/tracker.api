import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

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
    const { data } = await this.getData(`https://www.aliexpress.com/item/${id}.html`);
    const { 
      pageModule, 
      titleModule, 
      storeModule, 
      imageModule, 
      skuModule, 
      priceModule
    } = data;
    return {
      url: pageModule.itemDetailURL,
      title: titleModule.subject,
      productId: pageModule.productId,
      orders: titleModule.tradeCount,
      storeInfo: {
        url: storeModule.storeURL,
        name: storeModule.storeName,
        companyId: storeModule.companyId,
        storeNumber: storeModule.storeNum,
        followers: storeModule.followingNumber,
        ratingCount: storeModule.positiveNum,
        rating: storeModule.positiveRate,
        openingDate: storeModule.openTime,
        openedYears: storeModule.openedYear
      },
      ratings: {
        averageStar: titleModule.feedbackRating.averageStar,
        totalStartCount: titleModule.feedbackRating.totalValidNum,
      },
      images: (imageModule && imageModule.imagePathList) || [],
      smallImages: (imageModule && imageModule.summImagePathList) || [],
      variants: this.getItemVariants(skuModule),
      currency: data.webEnv.currency,
      originalPrice: {
        min: priceModule.minAmount.value,
        max: priceModule.maxAmount.value,
      },
      salePrice: {
        min: priceModule.minActivityAmount.value,
        max: priceModule.maxActivityAmount.value,
      },
    };

  }

  private getItemVariants(data) {
    const priceLists = data.skuPriceList || [];
    const optionsLists = data.productSKUPropertyList || [];

    const options = optionsLists.map(list => {
      return {
        id: list.skuPropertyId,
        name: list.skuPropertyName,
        values: list.skuPropertyValues.map(val => {
          return {
            id: val.propertyValueId,
            name: val.propertyValueName,
            displayName: val.propertyValueDisplayName,
            image: val.skuPropertyImagePath
          };
        })
      };
    });

    const lists = priceLists.map(list => {
      return {
        skuId: list.skuId,
        optionValueIds: list.skuPropIds,
        availableQuantity: list.skuVal.availQuantity,
        originalPrice: list.skuVal.skuAmount.value,
        salePrice: list.skuVal.skuActivityAmount.value
      };
    });

    return {
      options: options,
      prices: lists
    };
  }

}
