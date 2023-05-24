import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto/product.dto';
import { OrderDto } from './dto/order.dto';
import { ProductSearchDto } from './dto/search-product.dto';
@ApiTags('Product')
@UseGuards(JwtAuthGuard)
@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('search-product')
  searchPeoduct(@Body() dto:ProductSearchDto) {
    return this.productService.searchProduct(dto);
  }
   @Post('create-product')
   createProduct(@Body() dto:CreateProductDto) {
     return this.productService.createProduct(dto);
   }
   @Post('update-product')
   updateProduct(@Body() dto:UpdateProductDto) {
     return this.productService.updateProduct(dto);
   }
   @Post('delete-product')
   deleteProduct(@Body() dto:DeleteProductDto) {
     return this.productService.deleteProduct(dto);
   }
   @Post('create-order')
   createOrder(@Body() dto:OrderDto) {
     return this.productService.createOrder(dto);
   }
}
