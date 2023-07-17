import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto{
    @ApiProperty({type:Number})
    name: string;
    @ApiProperty({type:Number})
    description: string;
}