import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralSettingDto } from './create-general-setting.dto';

export class UpdateGeneralSettingDto extends PartialType(CreateGeneralSettingDto) {}
