import { Module } from '@nestjs/common';
import { DeliveryFeeService } from './delivery-fee.service';
import { DeliveryFeeController } from './delivery-fee.controller';

@Module({
  controllers: [DeliveryFeeController],
  providers: [DeliveryFeeService]
})
export class DeliveryFeeModule {}
