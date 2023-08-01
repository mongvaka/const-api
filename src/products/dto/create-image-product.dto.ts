import { ApiProperty } from "@nestjs/swagger";

export class CreateImageProductDto{
    @ApiProperty({type:String})
    name: string;
    @ApiProperty({type:String})
    url: string;
    @ApiProperty({type:String})
    type: string;
    @ApiProperty({type:Number})
    productId: number;
}