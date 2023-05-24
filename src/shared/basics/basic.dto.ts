import { ApiProperty } from '@nestjs/swagger';

export class BasicDto {
  @ApiProperty()
  active?: boolean;

  @ApiProperty()
  deleted?: boolean;
  createBy?:number;
}
