import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { BrandsModule } from '../brands/brands.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { OffersModule } from '../offers/offers.module';
import { ProductsModule } from '../products/products.module';
import { StoresModule } from '../stores/stores.module';
import { AliExpressModule } from '../aliexpress/aliexpress.module';

@Module({
  imports: [
    EasyconfigModule.register({ path: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BrandsModule,
    CategoriesModule,
    DiscountsModule,
    OffersModule,
    ProductsModule,
    StoresModule,
    AliExpressModule
  ],
})
export class AppModule {}
