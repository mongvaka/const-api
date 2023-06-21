import { ApiProperty } from "@nestjs/swagger";

export class VerifyMobileDto{
    @ApiProperty({type:Number})
    userId:number
}