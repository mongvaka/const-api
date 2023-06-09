import { ApiProperty } from "@nestjs/swagger";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";

export class SearchProductInBucketDto extends BasicsearchDto {
    @ApiProperty({type:Number})
    buyerId:number;
}