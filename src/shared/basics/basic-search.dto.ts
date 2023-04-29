import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsIn, IsBoolean } from 'class-validator';
export enum OrderBy {
  DESC = 'DESC',
  ASC = 'ASC',
}
export const TransformBoolean = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );
  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToBoolean(obj[key]);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };
  return function (target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};
const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
    return true;
  }
  if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
    return false;
  }
  return undefined;
};
export class BasicsearchDto {
  offset:number
  limit:number
  sortBy:string
  last:boolean
  totalElements:number
  totalPages:number
  @ApiPropertyOptional({ type: 'enum', enum: OrderBy })
  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  orderBy?: 'DESC' | 'ASC';
}
