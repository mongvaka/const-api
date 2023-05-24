import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";
import { EspType } from "src/shared/constans/enum-constans";
export class SearchChatDto extends BasicsearchDto {
    @ApiProperty({type:Number})
    clientId: number;
}

