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
import { AddProductToBucket } from './dto/add-product-to-bucket.dto';
import { SearchProductInBucketDto } from './dto/search-product-in-bucket.dto';
import { DeleteProductInBucket } from './dto/delete-product-in-bucket';
import { CreateOrderDto } from './dto/create-order.dto';
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
  @Get('notice/:id')
  @ApiParam({name:'id',type:String})
  getOrderNotification(@Param('id') id) {
    return this.productService.getOrderNotification(id);
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
   @Post('add-product-to-bucket')
   addProductToBucket(@Body() dto:AddProductToBucket) {
     return this.productService.increaseProductAmount(dto);
   }
   @Post('delete-product-in-bucket')
   deleteProductToBucket(@Body() dto:DeleteProductInBucket) {
     return this.productService.deleteProductInBucket(dto);
   }
   @Post('create-order')
   createOrder(@Body() dto:CreateOrderDto) {
     return this.productService.createNewOrder(dto);
   }
   @Post('search-order')
   searchOrder(@Body() dto:OrderSearchDto) {
     return this.productService.searchOrder(dto);
   }
   @Post('search-product-in-bucket')
   searchProductInBucket(@Body() dto:SearchProductInBucketDto) {
     return this.productService.searchProductInBucket(dto);
   }


}
