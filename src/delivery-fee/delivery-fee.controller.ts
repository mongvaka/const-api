import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryFeeService } from './delivery-fee.service';
import { CreateDeliveryFeeDto } from './dto/create-delivery-fee.dto';
import { UpdateDeliveryFeeDto } from './dto/update-delivery-fee.dto';

@Controller('delivery-fee')
export class DeliveryFeeController {
  constructor(private readonly deliveryFeeService: DeliveryFeeService) {}

  @Post()
  create(@Body() createDeliveryFeeDto: CreateDeliveryFeeDto) {
    return this.deliveryFeeService.create(createDeliveryFeeDto);
  }

  @Get()
  findAll() {
    return this.deliveryFeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryFeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryFeeDto: UpdateDeliveryFeeDto) {
    return this.deliveryFeeService.update(+id, updateDeliveryFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryFeeService.remove(+id);
  }
}
