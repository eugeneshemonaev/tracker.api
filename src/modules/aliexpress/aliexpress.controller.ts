import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AliExpressService } from './aliexpress.service';
import { SearchConditionsDto } from './dto/searchConditions.dto';

@Controller('aliexpress')
export class AliexpressController {
  constructor(private aliService: AliExpressService) {
  }

  @Get('/items/:id')
  async getItemInfo(@Param('id') id: string) {
    return this.aliService.getItemInfo(Number(id));
  }

  @Get('/search-items')
  async searchItems(@Query(new ValidationPipe({
    transform: true
  })) params: SearchConditionsDto) {
    return this.aliService.searchItems(params);
  }
}
