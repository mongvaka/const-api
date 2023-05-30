import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto/product.dto';
import { OrderDto } from './dto/order.dto';
import { ProductSearchDto } from './dto/search-product.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { OrderSearchDto } from './dto/search-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/shared/constans/constans';
import { Observable, of } from 'rxjs';
import { join } from 'path';
@ApiTags('Product')
@UseGuards(JwtAuthGuard)
@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('image/:name')
  @ApiParam({name:'name',type:String})
  findProfileImage(@Param('name') imagename, @Res() res): Observable<Object> {
      return of(res.sendFile(join(process.cwd(), 'uploads/product-images/' + imagename)));
  }
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file) {
  return file.filename
  }

  @Post('search-product')
  searchProduct(@Body() dto:ProductSearchDto) {
    return this.productService.searchProduct(dto);
  }
  @Post('product-detail')
  productDetail(@Body() dto:ProductDetailDto) {
    return this.productService.productDetail(dto);
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
   @Post('search-order')
   searchOrder(@Body() dto:OrderSearchDto) {
     return this.productService.searchOrder(dto);
   }


}
