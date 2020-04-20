import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGroup } from './product-groups.entity';
import { ProductGroupsController } from './product-groups.controller';
import { ProductGroupsService } from './product-groups.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductGroup]),
    ],
    controllers: [ProductGroupsController],
    providers: [ProductGroupsService]
})
export class ProductGroupsModule {}
