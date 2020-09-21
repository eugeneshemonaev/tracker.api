import { Module } from '@nestjs/common';
import { AliExpressService } from './aliexpress.service';
import { AliexpressController } from './aliexpress.controller';

@Module({
  providers: [AliExpressService],
  exports: [AliExpressService],
  controllers: [AliexpressController]
})
export class AliExpressModule {}
