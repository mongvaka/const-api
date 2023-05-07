import { ApiProperty } from "@nestjs/swagger";

export class GetUserDto{
    @ApiProperty({type:Number})
    id:number
}