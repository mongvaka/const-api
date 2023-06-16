import { ApiProperty } from "@nestjs/swagger";
export class CreateOrderDetailDto{
    @ApiProperty({type:Number})
    productId:number
    @ApiProperty({type:Number})
    value:number
    @ApiProperty({type:Number})
    optionId:number
    @ApiProperty({type:Number})
    price:number
    @ApiProperty({type:Number})
    bucketId:number
}
export class CreateOrderDto{
    @ApiProperty({type:Number})
    buyerId:number
    @ApiProperty({type:Array})
    ordersDetail:CreateOrderDetailDto[]
}