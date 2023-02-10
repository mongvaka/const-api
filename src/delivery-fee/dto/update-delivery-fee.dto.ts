import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryFeeDto } from './create-delivery-fee.dto';

export class UpdateDeliveryFeeDto extends PartialType(CreateDeliveryFeeDto) {}
