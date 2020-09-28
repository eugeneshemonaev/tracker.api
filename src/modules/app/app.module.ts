import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { ItemsModule } from '../items/items.module';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { AliExpressModule } from '../aliexpress/aliexpress.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tracker',
      password: 'tracker',
      database: 'tracker',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BrandsModule,
    CategoriesModule,
    DiscountsModule,
    ItemsModule,
    ProductsModule,
    StoresModule,
    AliExpressModule
  ],
})
export class AppModule {}
