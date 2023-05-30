import { ApiProperty } from "@nestjs/swagger";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";

export class OrderSearchDto extends BasicsearchDto {
    @ApiProperty({type:Number})
    buyerId:number;
}