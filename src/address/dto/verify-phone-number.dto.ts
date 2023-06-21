import { ApiProperty } from "@nestjs/swagger";

export class VerifyPhoneNumberDto {
    @ApiProperty({type:String})
    phoneNumber:string;
}