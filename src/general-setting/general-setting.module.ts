import { Module } from '@nestjs/common';
import { GeneralSettingService } from './general-setting.service';
import { GeneralSettingController } from './general-setting.controller';

@Module({
  controllers: [GeneralSettingController],
  providers: [GeneralSettingService]
})
export class GeneralSettingModule {}
