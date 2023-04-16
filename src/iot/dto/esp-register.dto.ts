import { ApiProperty } from "@nestjs/swagger";
import { EspType } from "src/shared/constans/enum-constans";

export class EspRegisterDto {
    @ApiProperty({type:String})
    key:string;
    @ApiProperty({type:String})

    type:EspType
}