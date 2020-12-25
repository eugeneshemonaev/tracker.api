import { HttpService, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ItemResponse } from './dto/itemResponse';
import { ItemInfo } from './dto/itemInfo.dto';
import { SkuModule } from './dto/skuModule.dto';
import { ProductSKUProperty } from './dto/productSKUProperty.dto';
import { SKUInfo } from './dto/skuInfo.dto';
import * as moment from 'moment';
import { SearchConditionsDto } from './dto/searchConditions.dto';
import { ItemsResponse } from './dto/itemsResponse';
import { DiscountInfo } from './dto/discountInfo.dto';
import { DiscountTypes } from '../../common/enums/discount-types.enum';
import { Units } from '../../common/enums/units.enum';
import { AmountTypes } from '../../common/enums/amount-types.enum';
import { Discount } from '../../models/discount.entity';
import { ListItem } from './dto/listItem';
import { BasicItemInfo } from './dto/basicItemInfo.dto';

@Injectable()
export class AliExpressService {
  private page;

  constructor(private readonly httpService: HttpService) {
    this.init()
      .catch(e => console.log(e));
  }

  private async init(): Promise<void> {
    const browser = await puppeteer.launch({headless: false, args: ['--disable-notifications']});
    this.page = await browser.newPage();
    await this.page.goto('https://www.aliexpress.com');
    await this.page.goto('https://www.aliexpress.com');
    await this.page.click('#switcher-info');
    await this.page.click('.switcher-currency .switcher-currency-c');
    await this.page.click('a[data-currency="USD"]');
    await this.page.click('.switcher-currency-c.language-selector');
    await this.page.click('a[data-locale="en_US"]');
    await this.page.click('.go-contiune-btn');
    console.log('Chrome is started');
    // await page.close();
  }

  private async getData<T>(url: string): Promise<T> {
    await this.page.goto(url, {waitUntil:'domcontentloaded'});
    // @ts-ignore
    return this.page.evaluate(() => runParams);
  }

  public async searchItems(searchConditions: SearchConditionsDto): Promise<BasicItemInfo[]> {
    const { minPrice, maxPrice, freeShipping, isFavorite, sortType } = searchConditions;
    let conditions = `&SearchText=${searchConditions.searchText.split(' ').join('+')}`;
    if(minPrice) {
      conditions += `&minPrice=${minPrice}`;
    }
    if(maxPrice) {
      conditions += `&maxPrice=${maxPrice}`;
    }
    if(freeShipping) {
      conditions += '&freeShipping=y';
    }
    if(isFavorite) {
      conditions += '&isFavorite=y';
    }
    if(sortType) {
      conditions += `&sortType=${sortType}`;
    }

    const items: BasicItemInfo[] = [];
    let currentPage = 1;
    let totalPages = 0;
    do {
      const data = await this.getData<ItemsResponse>(
        `https://www.aliexpress.com/wholesale?page=${currentPage}${conditions}`
      );
      for (const item of data.items) {
        if (item.saleMode === 'packaging_sale') {
          continue;
        }
        items.push({
          url: `https:${item.productDetailUrl}`,
          images: [item.imageUrl],
          price: item.price,
          productId: item.productId,
          rating: Number(item.starRating),
          title: item.title,
          orders: Number(item.tradeDesc.split(' ')[0]),
          store: {
            name: item.store.storeName
          }
        });
      }

      totalPages = Math.ceil(data.resultCount / data.resultSizePerPage);
      currentPage++;
    } while(currentPage <= totalPages);

    return items;
  }

  public async getItemInfo(id: number): Promise<ItemInfo> {
    const { data } = await this.getData<ItemResponse>(`https://www.aliexpress.com/item/${id}.html`);
    const {
      titleModule,
      storeModule,
      imageModule,
      skuModule,
      couponModule,
      priceModule
    } = data;

    return {
      url: storeModule.detailPageUrl,
      title: titleModule.subject,
      productId: storeModule.productId,
      categoryId: skuModule.categoryId,
      sellerAdminSeq: storeModule.sellerAdminSeq,
      orders: titleModule.tradeCount,
      rating: Number(titleModule.feedbackRating.averageStar),
      reviews: titleModule.feedbackRating.totalValidNum,
      images: (imageModule && imageModule.imagePathList) || [],
      smallImages: (imageModule && imageModule.summImagePathList) || [],
      sku: skuModule.hasSkuProperty ? this.getItemVariants(skuModule) : [],
      discounts: couponModule.fixedDiscountLevelList,
      price: priceModule.formatedPrice,
      store: {
        url: `https:${storeModule.storeURL}`,
        name: storeModule.storeName,
        companyId: storeModule.companyId,
        storeId: storeModule.storeNum,
        followers: storeModule.followingNumber,
        ratingCount: storeModule.positiveNum,
        rating: Number(storeModule.positiveRate.split('%')[0]),
        openingDate: moment(new Date(storeModule.openTime)).format('YYYY-MM-DD'),
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
        price: sku.skuVal.skuAmount.value,
        currency: sku.skuVal.skuAmount.currency,
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

  private async getDiscounts(item: ItemInfo): Promise<Discount[]> {
    const { data } = await this.httpService.request<DiscountInfo>({
      params: {
        itemId: item.productId,
        categoryId: item.categoryId,
        sellerAdminSeq: item.sellerAdminSeq,
        storeNum: item.store.storeId,
      }
    }).toPromise();

    let discounts = [];
    if (data.crossCouponList) {
      const result = data.crossCouponList.map(e => ({
        type: DiscountTypes.SPEC_COUPON,
        from: this.parseAmount(e.fixedAmount),
        unit: Units.MONEY,
        amount: this.parseAmount(e.discountAmount),
        amountType: AmountTypes.SUM,
        valid_till: moment(e.endTime),
        discountId: e.promotionId
      }));

      discounts = discounts.concat(result);
    }

    if (data.shopCouponList) {
      const result = data.shopCouponList.map(e => ({
        type: DiscountTypes.STORE_COUPON,
        from: this.parseAmount(e.orderAmountLimitFormatSTR),
        unit: Units.MONEY,
        amount: this.parseAmount(e.denominationFormatSTR),
        amountType: AmountTypes.SUM,
        valid_till: moment(e.expiresTime),
        discountId: e.promotionId
      }));

      discounts = discounts.concat(result);
    }

    if (data.shopFullPieceList) {
      const result = data.shopFullPieceList.map(e => ({
        type: DiscountTypes.INSTANT_DISC,
        amount: Number(e.discount.slice(0,-1)),
        amountType: AmountTypes.PERCENTAGE,
      }));

      discounts = discounts.concat(result);
    }

    if (item.discounts) {
      const result = item.discounts.map(e => ({
        type: DiscountTypes.INSTANT_DISC,
        from: this.parseAmount(e.fixedAmount),
        unit: Units.MONEY,
        amount: this.parseAmount(e.discountAmount),
        amountType: AmountTypes.SUM,
      }));

      discounts = discounts.concat(result);
    }

    return discounts;
  }

  private parseAmount(amount: string): number {
    return Number(amount.split('$').pop() || 0);
  }
}
