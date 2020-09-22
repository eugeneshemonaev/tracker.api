import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Item } from '../../models/item.entity';
import { ItemsService } from './items.service';

@Crud({
  model: {
    type: Item,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('items')
export class ItemsController implements CrudController<Item>{
  constructor(public service: ItemsService) {
  }
}
