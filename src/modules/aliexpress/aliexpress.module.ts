import { Module } from '@nestjs/common';
import { AliExpressService } from './aliexpress.service';

@Module({
  providers: [AliExpressService],
  exports: [AliExpressService]
})
export class AliExpressModule {}
