import { ApiProperty } from "@nestjs/swagger";

export class SensorResponse{
    @ApiProperty({type:Number})
    sensorCount:number;
    @ApiProperty({type:Number})
    controllerCount:number;
    @ApiProperty({type:Number})
    lightSensor:number;
    @ApiProperty({type:Number})
    tempSensor:number;
    @ApiProperty({type:Number})
    homSensor:number;
}