import { ApiProperty } from "@nestjs/swagger";

export class VerifyOptDto {
    @ApiProperty({type:String})
    otpCode:string;
    @ApiProperty({type:String})
    phoneNumber:string;
}