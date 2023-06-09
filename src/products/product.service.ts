import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { ProductComment } from './entities/product-comment.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto/product.dto';
import { OrderDto } from './dto/order.dto';
import { OrderStatus } from './entities/order-status-tracking.entity';
import { ProductSearchDto } from './dto/search-product.dto';
import { BasicResponseDto, Pageable } from 'src/shared/basics/basic-response.dto';
import { getRespones } from 'src/shared/functions/respone-function';
import { ProductDetailDto } from './dto/product-detail.dto';
import { OrderSearchDto } from './dto/search-order.dto';
import { AddProductToBucket } from './dto/add-product-to-bucket.dto';
import { Bucket } from './entities/bucket.entity';
import { SearchProductInBucketDto } from './dto/search-product-in-bucket.dto';

@Injectable()
export class ProductService {


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
    @InjectRepository(ProductComment)
    private readonly productCommentRepository: Repository<ProductComment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
  ) {

  }
  async searchProduct(dto: ProductSearchDto) {
    const data = await this.productRepository.find({
      relations: ['images', 'options'],
      select: {
        id: true,
        name: true,
        code: true,
        detail: true,
        rating: true,
        images: {
          name: true,
          url: true,
          type: true
        },
        options: {
          id: true,
          price: true,
          name: true
        }
      },
      where: {
        name: Like(`%${dto.name}%`)
      }
    });
    return getRespones(data, dto);
  }
  async productDetail(dto: ProductDetailDto) {
    const model = await this.productRepository.find({
      relations: ['images', 'comment', 'comment.order', 'options'],
      select: {
        id: true,
        name: true,
        code: true,
        detail: true,
        rating: true,
        sold: true,
        images: {
          url: true,
          name: true,
          type: true
        },
        comment: {
          comment: true,
          commentor: {
            email: true,
            firstName: true,
            lastName: true
          },
          rating: true,
          order: {
            oderDate: true,
            orderNumber: true,
          }
        },
        options: {
          id: true,
          name: true,
          price: true
        }
      },
      where: {
        id: dto.id,
      }
    }
    )
    console.log(model[0].options);
    return model[0]

  }
  async createProduct(dto: CreateProductDto) {
    let model: Product = {
      ...dto,
    }
    return this.productRepository.save(this.productRepository.create(model))
  }
  async updateProduct(dto: UpdateProductDto) {
    let model = await this.productRepository.findOne({ where: { id: dto.id } })
    model = {
      ...model,
      ...dto
    }
    return this.productRepository.save(model)
  }
  async deleteProduct(dto: DeleteProductDto) {
    return this.productRepository.remove(
      await this.productRepository.findOne({ where: { id: dto.id } })
    )
  }
  async createOrder(dto: OrderDto) {
    const existModel = await this.getExistOrder(dto.buyerId, dto.sellerId)
    if (existModel) {
      return this.addProductToOrder(existModel.id, dto.productId, dto.value, dto.optionId)
    }
    return this.createNewOrder(dto)
  }
  private async addProductToOrder(orderId: number, productId: number, value: number, optionId: number) {
    const existProductInOrder = await this.orderDetailRepository.findOne({
      where: {
        productId: productId,
        orderId: orderId
      }
    })
    if (existProductInOrder) {
      existProductInOrder.value = ((+ existProductInOrder.value) + (+value))
      existProductInOrder.updatedAt = new Date
      return this.orderDetailRepository.save(existProductInOrder)
    }
    const detailModel: OrderDetail = {
      productId: productId,
      orderId: orderId,
      value: value,
      optionId: optionId,
      createdAt: new Date,
    }
    return this.orderDetailRepository.save(
      this.orderDetailRepository.create(detailModel)
    )
  }
  private async createNewOrder(dto: OrderDto) {
    const orderNumber = await this.getOrderNumber()
    const orderModel: Order = {
      orderNumber,
      buyerId: dto.buyerId,
      sellerId: dto.sellerId,
      orderDetails: [
        {
          value: dto.value,
          productId: dto.productId,
          optionId: dto.optionId
        }
      ],
      statusTracking: [
        {
          status: OrderStatus.BUCKET,
          updaterId: dto.buyerId,
          statusDate: new Date,
          reason: ''
        }
      ]
    }
    return this.orderRepository.save(
      this.orderRepository.create(orderModel)
    )
  }
  private async getOrderNumber() {
    const currentOrder = this.getCurrentOrderNumber();
    const model = await this.orderRepository.findOne({
      relations: ['statusTracking'],
      where: {
        orderNumber: Like(`${currentOrder}%`)
      },
      order: { id: 'DESC' }
    })
    if (model) {
      return ''
    } else {
      return `${currentOrder}-0000001`
    }
  }
  private async getExistOrder(buyerId: number, sellerId: number) {
    const currentOrder = this.getCurrentOrderNumber();
    return this.orderRepository.findOne({
      relations: ['statusTracking'],
      where: [
        {
          orderNumber: Like(`${currentOrder}%`), statusTracking: {
            status: OrderStatus.BUCKET,
          }, buyerId
        },

      ]
      , order: { id: 'DESC' }
    })
  }
  private getCurrentOrderNumber(): string {
    const date: Date = new Date();
    const month: string = (date.getMonth() < 10) ? (`0` + date.getMonth() + 1) : (date.getMonth() + 1).toString()
    return `${date.getFullYear()}${month}${date.getDate()}`
  }
  async searchOrder(dto: OrderSearchDto) {
    return this.orderRepository.find({
      relations: ['orderDetails'],
    })
  }
  async increaseProductAmount(dto: AddProductToBucket) {
    const model = await this.bucketRepository.findOne({
      where: {
        id: dto.productId
      }
    })
    if (!model) {
      return this.addProductToBucket(dto)
    }
    model.value = (+model.value) + (+dto.value)
    return this.bucketRepository.save(model);
  }
  async addProductToBucket(dto: AddProductToBucket) {
    const model: Bucket = {
      ...dto
    }
    return this.bucketRepository.save(
      this.bucketRepository.create(model)
    )
  }
  async searchProductInBucket(dto: SearchProductInBucketDto) {
    const data = await this.bucketRepository.find(
      {

        relations:['product','product.images','product.options'],
        select: {
          id:true,
          buyerId: true,
          value: true,
          optionId: true,
          productId: true,
          
          product: {
            id:true,
            name: true,
            code: true,
            detail:true,
            rating:true,
            sold:true,
            images: {
              id:true,
              name: true,
              url: true,
              type:true
            },
            options: {
              name: true,
              id: true,
              price: true
            }
          }
        },
        order: {
          createdAt: 'DESC'
        },
        where: {
          buyerId: dto.buyerId
        },
      },

    )
    return getRespones(data, dto);
  }
  
}
