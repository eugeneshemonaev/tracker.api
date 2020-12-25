import { HttpModule, Module } from '@nestjs/common';
import { AliExpressService } from './aliexpress.service';
import { AliexpressController } from './aliexpress.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://aliexpress.com/aeglodetailweb/api/store/header',
      method: 'GET',
    }),
  ],
  providers: [AliExpressService],
  exports: [AliExpressService],
  controllers: [AliexpressController]
})
export class AliExpressModule {}
