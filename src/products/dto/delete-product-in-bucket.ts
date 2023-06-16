import { ApiProperty } from "@nestjs/swagger";

export class DeleteProductInBucket{
    @ApiProperty({type:Number})
    id:number
}