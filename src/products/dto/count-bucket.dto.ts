import { ApiProperty } from "@nestjs/swagger";

export class CountBucketDto{
    @ApiProperty({type:Number})
    userId:number
}