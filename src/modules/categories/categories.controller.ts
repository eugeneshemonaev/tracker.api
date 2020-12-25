import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Category } from '../../models/category.entity';
import { CategoriesService } from './categories.service';

@Crud({
  model: {
    type: Category,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('categories')
export class CategoriesController implements CrudController<Category>{
  constructor(public service: CategoriesService) {
  }
}
