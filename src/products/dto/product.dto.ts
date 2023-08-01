import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";
import { BasicDto } from "src/shared/basics/basic.dto";
import { EspType } from "src/shared/constans/enum-constans";
import { ProductImagesDto } from "./product-images.dto";
export class ProductOptionDto{
    @ApiProperty({type:String})
    name: string;
    @ApiProperty({type:Number})
    price?: number;
}
export class ProductDto extends BasicDto{
    @ApiProperty({type:String})
    name:string;
    @ApiProperty({type:String})
    code:string;
    @ApiPropertyOptional({type:String})
    detail:string;
}
export class CreateProductDto extends ProductDto{
    @ApiProperty({type:[ProductImagesDto]})
    images:ProductImagesDto[];
    @ApiProperty({type:[ProductOptionDto]})
    options:ProductOptionDto[];
}
export class UpdateProductDto extends ProductDto{
    @ApiProperty({type:Number})
    id:number;
}
export class DeleteProductDto{
    @ApiProperty({type:Number})
    id:number;
}
