import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressDto{
    @ApiProperty({type:Number})
    userId:number;
    @ApiProperty({type:String})
    countryCode:string;
    @ApiProperty({type:String})
    provinceCode:string;
    @ApiProperty({type:String})
    districtCode:string;
    @ApiProperty({type:String})
    subDistrictCode:string;
    @ApiProperty({type:String})
    phoneNumber:string;
    @ApiProperty({type:String})
    address:string;

}