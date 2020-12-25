import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Product } from '../../models/product.entity';
import { ProductsService } from './products.service';

@Crud({
  model: {
    type: Product,
  },
  routes: {
    exclude: ['createManyBase']
  },
  query: {
    join: {
      brand: {},
      category: {}
    }
  }
})
@Controller('products')
export class ProductsController implements CrudController<Product>{
  constructor(public service: ProductsService) {
  }
}
