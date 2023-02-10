import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopInfoService } from './shop-info.service';
import { CreateShopInfoDto } from './dto/create-shop-info.dto';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';

@Controller('shop-info')
export class ShopInfoController {
  constructor(private readonly shopInfoService: ShopInfoService) {}

  @Post()
  create(@Body() createShopInfoDto: CreateShopInfoDto) {
    return this.shopInfoService.create(createShopInfoDto);
  }

  @Get()
  findAll() {
    return this.shopInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopInfoDto: UpdateShopInfoDto) {
    return this.shopInfoService.update(+id, updateShopInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopInfoService.remove(+id);
  }
}
