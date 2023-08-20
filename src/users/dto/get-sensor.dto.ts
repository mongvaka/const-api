import { ApiProperty } from "@nestjs/swagger";

export class GetSensorDto {
    @ApiProperty({type:Number})
    userId:number;
}