import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Offer } from '../../models/offer.entity';
import { OffersService } from './offers.service';
import { SearchConditionsDto } from '../aliexpress/dto/searchConditions.dto';
import { ListItem } from '../aliexpress/dto/listItem';
import { BasicItemInfo } from '../aliexpress/dto/basicItemInfo.dto';

@Crud({
  model: {
    type: Offer,
  },
  routes: {
    exclude: ['createManyBase', 'createOneBase']
  }
})
@Controller('offers')
export class OffersController implements CrudController<Offer>{
  constructor(public service: OffersService) {
  }

  @Post()
  async create(@Body() data):Promise<void> {
    await this.service.save(data);
  }

  @Get('/search')
  async search(@Query() query: SearchConditionsDto):Promise<BasicItemInfo[]> {
    return this.service.search(query);
  }
}
