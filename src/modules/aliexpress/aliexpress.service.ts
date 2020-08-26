import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AliExpressService {
  private browser;
  constructor() {
    puppeteer.launch()
      .then(res => this.browser = res)
      .catch(e => console.log(e));
  }

  private async getData<T>(id: number): Promise<T> {
    const page = await this.browser.newPage();
    await page.goto(`https://www.aliexpress.com/item/${id}.html`);
    // @ts-ignore
    const { data } = await page.evaluate(() => runParams);

    return data;
  }

  public getShop
}
