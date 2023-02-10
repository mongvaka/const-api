import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralSettingService } from './general-setting.service';
import { CreateGeneralSettingDto } from './dto/create-general-setting.dto';
import { UpdateGeneralSettingDto } from './dto/update-general-setting.dto';

@Controller('general-setting')
export class GeneralSettingController {
  constructor(private readonly generalSettingService: GeneralSettingService) {}

  @Post()
  create(@Body() createGeneralSettingDto: CreateGeneralSettingDto) {
    return this.generalSettingService.create(createGeneralSettingDto);
  }

  @Get()
  findAll() {
    return this.generalSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalSettingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralSettingDto: UpdateGeneralSettingDto) {
    return this.generalSettingService.update(+id, updateGeneralSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalSettingService.remove(+id);
  }
}
