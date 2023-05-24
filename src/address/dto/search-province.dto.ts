import { ApiProperty } from "@nestjs/swagger";

export class SearchProvinceDto{
    @ApiProperty({type:String})
    countryCode:string;
}