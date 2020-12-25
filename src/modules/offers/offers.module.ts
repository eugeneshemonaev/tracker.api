import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from '../../models/offer.entity';
import { StoresModule } from '../stores/stores.module';
import { AliExpressModule } from '../aliexpress/aliexpress.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer]),
    StoresModule,
    AliExpressModule
  ],
  providers: [OffersService],
  controllers: [OffersController]
})
export class OffersModule {}
