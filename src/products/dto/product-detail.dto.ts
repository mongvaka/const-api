import { ApiProperty } from "@nestjs/swagger";

export class ProductDetailDto{
    @ApiProperty({type:Number})
    id:number;
}