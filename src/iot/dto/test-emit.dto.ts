import { ApiProperty } from "@nestjs/swagger";

export class TestEmitDto {
    @ApiProperty({type:String})
    emitKey:string;
    @ApiProperty({type:String})
    message:string
}