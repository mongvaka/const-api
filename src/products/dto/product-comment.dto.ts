import { ApiProperty } from "@nestjs/swagger";
import { BasicDto } from "src/shared/basics/basic.dto";

export class ProductCommentDto extends BasicDto{
    @ApiProperty({type:String})
    comment: string;
    @ApiProperty({type:Number})
    commentorId: number;
    @ApiProperty({type:Number})
    productId: number;
    @ApiProperty({type:Number})
    rating: number;
    @ApiProperty({type:Number})
    orderId: number;



}