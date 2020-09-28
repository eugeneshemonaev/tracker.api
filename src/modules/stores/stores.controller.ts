import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Store } from '../../models/store.entity';
import { StoresService } from './stores.service';

@Crud({
  model: {
    type: Store,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('stores')
export class StoresController implements CrudController<Store>{
  constructor(public service: StoresService) {
  }
}
