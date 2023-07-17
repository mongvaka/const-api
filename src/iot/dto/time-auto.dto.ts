import { ApiProperty } from "@nestjs/swagger";

export class TimeAutoDto {
    @ApiProperty({type:Number})
    pin:number;
    @ApiProperty({type:Number})
    startTime:number;
    @ApiProperty({type:Number})
    endTime:number;
}