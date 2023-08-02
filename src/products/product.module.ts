import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EspController } from "src/iot/esp.controller";
import { EspService } from "src/iot/esp.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { OrderDetail } from "./entities/order-detail.entity";
import { OrderStatusTracking } from "./entities/order-status-tracking.entity";
import { Order } from "./entities/order.entity";
import { Product } from "./entities/product.entity";
import { ProductImage } from "./entities/product-image.entity";
import { ProductComment } from "./entities/product-comment.entity";
import { Bucket } from "./entities/bucket.entity";
import { Category } from "./entities/category.entity";
import { ProductOption } from "./entities/product-option.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail, 
      OrderStatusTracking, 
      Order, 
      Product, 
      ProductImage, 
      ProductComment,
      Bucket,Category,ProductOption
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }
