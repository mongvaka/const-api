import { Injectable } from '@nestjs/common';
import { CreateGeneralSettingDto } from './dto/create-general-setting.dto';
import { UpdateGeneralSettingDto } from './dto/update-general-setting.dto';

@Injectable()
export class GeneralSettingService {
  create(createGeneralSettingDto: CreateGeneralSettingDto) {
    return 'This action adds a new generalSetting';
  }

  findAll() {
    return `This action returns all generalSetting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalSetting`;
  }

  update(id: number, updateGeneralSettingDto: UpdateGeneralSettingDto) {
    return `This action updates a #${id} generalSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalSetting`;
  }
}
