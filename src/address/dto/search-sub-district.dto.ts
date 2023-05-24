import { ApiProperty } from "@nestjs/swagger";

export class SearchSubDistrictDto{
    @ApiProperty({type:String})
    districtCode:string;
}