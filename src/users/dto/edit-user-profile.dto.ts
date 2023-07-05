import { ApiProperty } from "@nestjs/swagger";

export class EditUserProfileDto{
    @ApiProperty({type:Number})
    id:number;
    @ApiProperty({type:String})
    fName:string;
    @ApiProperty({type:String})
    lName:string;


}