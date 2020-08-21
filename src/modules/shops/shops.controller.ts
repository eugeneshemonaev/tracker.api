import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Shop } from '../../models/shop.entity';
import { ShopsService } from './shops.service';

@Crud({
  model: {
    type: Shop,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('shops')
export class ShopsController implements CrudController<Shop>{
  constructor(public service: ShopsService) {
  }
}
