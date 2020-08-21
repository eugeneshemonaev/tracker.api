import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Link } from '../../models/link.entity';
import { LinksService } from './links.service';

@Crud({
  model: {
    type: Link,
  },
  routes: {
    exclude: ['createManyBase']
  }
})
@Controller('links')
export class LinksController implements CrudController<Link>{
  constructor(public service: LinksService) {
  }
}
