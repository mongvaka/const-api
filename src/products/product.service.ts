import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
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
import { DeleteProductInBucket } from './dto/delete-product-in-bucket';
import { CreateOrderDto } from './dto/create-order.dto';
import { CountBucketDto } from './dto/count-bucket.dto';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateImageProductDto } from './dto/create-image-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {

  }
  async createImageProduct(dto: CreateImageProductDto) {
    const model:ProductImage = {
      ...dto
    }
    return this.productImageRepository.save(
      this.productImageRepository.create(model)
    )
  }
  async createCategory(dto: CreateCategoryDto) {
    return this.categoryRepository.save(
      this.categoryRepository.create(dto)
    )
  }
  async countBucket(dto: CountBucketDto) {
    return this.bucketRepository.count({ where: { buyerId: dto.userId } })
  }
  async deleteProductInBucket(dto: DeleteProductInBucket) {
    return this.bucketRepository.remove(
      await this.bucketRepository.findOne({ where: { ...dto } })
    )
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
        categoryId:true,
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
        name: Like(`%${dto.name}%`),
        categoryId:dto.categoryId
      }
    });
    return getRespones(data, dto);
  }
  async getCategory(){
    return this.categoryRepository.find({select:{id:true,name:true,description:true}})
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
        categoryId:true,
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
    return model[0]

  }
  async createProduct(dto: CreateProductDto) {
    let model: Product = {
      ...dto    }
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
  async createNewOrder(dto: CreateOrderDto) {
    const orderNumber = await this.getOrderNumber()
    const orderDetail: OrderDetail[] = dto.ordersDetail.map(m => {
      return {
        value: m.value,
        productId: m.productId,
        optionId: m.optionId,
        price: m.price
      }
    })
    const orderModel: Order = {
      orderNumber,
      oderDate: new Date,
      buyerId: dto.buyerId,
      sellerId: null,
      orderDetails: orderDetail,
      status: OrderStatus.BUYER_CONFIRM,
      deliveryTag: '',
      statusTracking: [
        {
          status: OrderStatus.BUYER_CONFIRM,
          updaterId: dto.buyerId,
          statusDate: new Date,
          reason: ''
        }
      ]
    }
    const result = await this.orderRepository.save(
      this.orderRepository.create(orderModel)
    )
    await this.bucketRepository.remove(
      await this.bucketRepository.find({ where: { id: In(dto.ordersDetail.map(m => m.bucketId)) } })
    )
    return result
  }
  private async getOrderNumber() {
    const currentOrder = this.getCurrentOrderNumber();

    const model = await this.orderRepository.findOne({
      where: {
        orderNumber: Like(`${currentOrder}%`)
      },
      order: { id: 'DESC' }
    })
    if (model) {
      const oldOrderNumber = model.orderNumber.split('-');
      const currentOrdering: number = +oldOrderNumber[1]
      const newOrder: number = currentOrdering + 1;
      const newOrderNumber: string = `${currentOrder}-${this.leftPad(newOrder, 7)}`;
      return newOrderNumber;
    } else {
      return `${currentOrder}-0000001`
    }
  }
  private getCurrentOrderNumber(): string {
    const date: Date = new Date();
    const month: string = (date.getMonth() < 10) ? (`0` + date.getMonth() + 1) : (date.getMonth() + 1).toString()
    return `${date.getFullYear()}${month}${date.getDate()}`
  }
  async searchOrder(dto: OrderSearchDto) {
    const data = await this.orderRepository.find({
      relations: ['orderDetails',
        'statusTracking',
        'orderDetails.product',
        'orderDetails.product.images',
      ],
      select: {
        id: true,
        orderNumber: true,
        buyerId: true,
        oderDate: true,
        status: true,
        statusTracking: {
          id: true,
          orderId: true,
          status: true,
          statusDate: true,
          reason: true
        },
        orderDetails: {
          id: true,
          value: true,
          price: true,
          product: {
            name: true,
            images: {
              url: true
            }
          }
        }
      },
      where: {
        status: dto.status
      }
    })
    return getRespones(data, dto);
  }
  async increaseProductAmount(dto: AddProductToBucket) {
    const model = await this.bucketRepository.findOne({
      where: {
        id: dto.productId,
        optionId: dto.optionId
      }
    })
    if (!model) {
      return this.addProductToBucket(dto)
    }
    model.value = (+model.value) + (+dto.value)
    model.activate = dto.activate
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

        relations: ['product', 'product.images', 'product.options'],
        select: {
          id: true,
          buyerId: true,
          value: true,
          optionId: true,
          productId: true,
          activate: true,
          product: {
            id: true,
            name: true,
            code: true,
            detail: true,
            rating: true,
            sold: true,
            images: {
              id: true,
              name: true,
              url: true,
              type: true
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
  async getOrderNotification(id: number) {
    let delivering: number = 0;
    let canceled: number = 0;
    let canReview: number = 0;
    let completed: number = 0;
    const orders = await this.orderRepository.find({ where: { buyerId: id } })
    console.log(orders);
    console.log(orders.length);

    orders.forEach(el => {
      if (el.status == OrderStatus.BUYER_CONFIRM) {
        delivering += 1
      }
      if (el.status == OrderStatus.CANCELED) {
        canceled += 1
      }
      if (el.status == OrderStatus.DELIVERED) {
        canReview += 1
      }
      if (el.status == OrderStatus.COMLETED) {
        completed += 1
      }
    })
    const result = [
      {
        "name": 'การจัดส่ง',
        "icon": 'box.svg',
        "status": OrderStatus.BUYER_CONFIRM,
        "value": delivering
      },
      {
        "name": 'ที่สำเร็จ',
        "icon": 'delivery.svg',
        "status": OrderStatus.COMLETED,
        "value": completed
      },
      {
        "name": 'การยกเลิก',
        "icon": 'cancel_circle.svg',
        "status": OrderStatus.CANCELED,
        "value": canceled
      },
      {
        "name": 'ให้คะแนน',
        "icon": 'star.svg',
        "status": OrderStatus.DELIVERED,
        "value": canReview
      },
    ]
    console.log(result);

    return result;
  }
  leftPad(number: number, targetLength: number): string {
    let output = number.toString();
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  }
}
