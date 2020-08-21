import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Discount } from '../../models/discount.entity';
import { DiscountsService } from './discounts.service';

@Crud({
  model: {
    type: Discount,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('discounts')
export class DiscountsController implements CrudController<Discount>{
  constructor(public service: DiscountsService) {
  }
}
