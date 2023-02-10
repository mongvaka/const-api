import { Injectable } from '@nestjs/common';
import { CreateShopInfoDto } from './dto/create-shop-info.dto';
import { UpdateShopInfoDto } from './dto/update-shop-info.dto';

@Injectable()
export class ShopInfoService {
  create(createShopInfoDto: CreateShopInfoDto) {
    return 'This action adds a new shopInfo';
  }

  findAll() {
    return `This action returns all shopInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopInfo`;
  }

  update(id: number, updateShopInfoDto: UpdateShopInfoDto) {
    return `This action updates a #${id} shopInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopInfo`;
  }
}
