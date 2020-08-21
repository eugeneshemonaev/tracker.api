import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { LinksModule } from '../links/links.module';
import { ProductsModule } from '../products/products.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'matchup',
      password: 'matchup',
      database: 'matchup',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BrandsModule,
    CategoriesModule,
    DiscountsModule,
    LinksModule,
    ProductsModule,
    ShopsModule
  ],
})
export class AppModule {}
