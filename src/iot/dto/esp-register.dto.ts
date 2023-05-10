import { ApiProperty } from "@nestjs/swagger";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";
import { EspType } from "src/shared/constans/enum-constans";
export class EspChildSearchDto extends BasicsearchDto {
    @ApiProperty({type:String})
    name:string;
    @ApiProperty({type:Number})
    ownerId:number;
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
export class ChildDto{
    @ApiProperty({type:Number})
    id:number;

}
export class SheduleDto{
    @ApiProperty({type:Number})
    id:number;
    @ApiProperty({type:String})
    startTime:string;
    @ApiProperty({type:String})
    endTime:string;
}
export class CreateSheduleDto{
    @ApiProperty({type:Number})
    id:number;
    @ApiProperty({type:Boolean})
    isManual:boolean;
    @ApiProperty({type:String})
    name:string;
    @ApiProperty({type:[SheduleDto]})
    schedule:SheduleDto[];
}
export class DeleteSheduleDto{
    @ApiProperty({type:Number})
    id:number;
}