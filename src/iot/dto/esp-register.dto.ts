import { ApiProperty } from "@nestjs/swagger";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";
import { EspType } from "src/shared/constans/enum-constans";
export class EspChildSearchDto extends BasicsearchDto {
    @ApiProperty({type:String})
    name:string;

}
export class EspRegisterDto {
    @ApiProperty({type:String})
    key:string;
    @ApiProperty({type:String})

    type:EspType
}
export class SwitchDto {
    @ApiProperty({type:String})
    key:string;
    @ApiProperty({type:Number})
    pin:number
    @ApiProperty({type:Number})
    status:number
    @ApiProperty({type:Number})
    mainId:number
}
export class SwitchStatusDto{
     id:number;
     name:string;
     pin:number;
     status:number;
     key:string;
}