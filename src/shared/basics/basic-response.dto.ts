import { ApiProperty } from '@nestjs/swagger';
export class Pageable {
  sort: Sort
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}
export class Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
export class BasicResponseDto {
  @ApiProperty({ description: 'รายการข้อมูล' })
  content: any[];
  @ApiProperty({ description: 'หน้าทั้งหมด' })
  pageable: Pageable
  totalElements: number
  totalPages: number
  last: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  empty: boolean
}
