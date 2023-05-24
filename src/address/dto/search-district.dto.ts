import { ApiProperty } from "@nestjs/swagger";

export class SearchDistrictDto{
    @ApiProperty({type:String})
    provinceCode:string;
}