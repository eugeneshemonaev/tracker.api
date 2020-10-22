import { Controller, Get, Param } from '@nestjs/common';
import { AliExpressService } from './aliexpress.service';

@Controller('aliexpress')
export class AliexpressController {
  constructor(private aliService: AliExpressService) {
  }

  @Get(':id')
  async findAll(@Param('id') id: string) {
    return this.aliService.getItemInfo(Number(id));
  }

  // @Get()
  // async findAll() {
  //   return this.aliService.getItemInfo(32796110564);
  // }
}
