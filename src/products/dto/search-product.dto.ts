import { ApiProperty } from "@nestjs/swagger";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";

export class ProductSearchDto extends BasicsearchDto {
    @ApiProperty({type:String})
    name:string;
    @ApiProperty({type:Number})
    categoryId:number;
}