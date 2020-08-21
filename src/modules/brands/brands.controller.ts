import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Brand } from '../../models/brand.entity';
import { BrandsService } from './brands.service';

@Crud({
  model: {
    type: Brand,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('brands')
export class BrandsController implements CrudController<Brand>{
  constructor(public service: BrandsService) {
  }
}
