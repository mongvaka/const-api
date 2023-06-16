import { ApiProperty } from "@nestjs/swagger";
import { BasicDto } from "src/shared/basics/basic.dto";

export class AddProductToBucket extends BasicDto{
    @ApiProperty({type:Number})
    productId: number;
    @ApiProperty({type:Number})
    buyerId: number;
    @ApiProperty({type:Number})
    value: number;
    @ApiProperty({type:Number})
    optionId: number;
    @ApiProperty({type:Boolean})
    activate: boolean;
}