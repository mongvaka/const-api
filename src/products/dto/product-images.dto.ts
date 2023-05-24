import { ApiProperty } from "@nestjs/swagger";
import { BasicDto } from "src/shared/basics/basic.dto";

export class ProductImagesDto extends BasicDto{
    @ApiProperty({type:String})
    name: string;
    @ApiProperty({type:String})
    url: string;
    @ApiProperty({type:String})
    type: string;
}