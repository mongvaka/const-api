import { ApiProperty } from '@nestjs/swagger';

export class BasicResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  error: string[];

  @ApiProperty()
  data: any[];

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  total: number;
}
