import { Controller, Get } from '@nestjs/common';
import { AliExpressService } from './aliexpress.service';

@Controller('aliexpress')
export class AliexpressController {
  constructor(private aliService: AliExpressService) {
  }

  @Get()
  async findAll() {
    await this.aliService.getStoreInfo(2294050);
  }
}
