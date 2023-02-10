import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
}
