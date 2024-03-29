import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BasicDto } from "src/shared/basics/basic.dto";

export class OrderDto extends BasicDto{
    @ApiProperty({type:Number})
    productId: number;
    @ApiProperty({type:Number})
    sellerId: number;
    @ApiProperty({type:Number})
    buyerId: number;
    @ApiProperty({type:Number})
    value: number;
    @ApiProperty({type:Number})
    optionId: number;
}