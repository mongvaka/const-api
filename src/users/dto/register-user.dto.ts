import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({type:String})
    email:string;
    @ApiProperty({type:String})
    password:string;
    @ApiProperty({type:String})
    rePassword:string;
}