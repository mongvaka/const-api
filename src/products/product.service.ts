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
  ) {

  }
  async searchProduct(dto: ProductSearchDto) {
    const data = await this.productRepository.find({
      relations: ['images'],
      select: {
        id:true,
        name:true,
        code:true,
        detail:true,
        rating:true,
        images:{
          name:true,
          url:true,
          type:true
        }
      },
      where: {
        name:Like(`%${dto.name}%`)
      }
    });
    return getRespones(data,dto);
  }
  async productDetail(dto: ProductDetailDto) {
    return this.productRepository.findOne({
      relations:['images','comment','comment.order'],
      select:{
        id:true,
        name:true,
        code:true,
        detail:true,
        images:{
          url:true,
          name:true,
          type:true
        },
        comment:{
          comment: true,
          commentor:{
            email:true,
            firstName:true,
            lastName:true
          },
          rating:true,
          order:{
            oderDate:true,
            orderNumber:true,
          }
        }
      },
      where:{
      id:dto.id,
    }})
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
    const existModel = await this.getExistOrder(dto.buyerId,dto.sellerId)
    if(existModel){
      return this.addProductToOrder(existModel.id,dto.productId,dto.value)
    }
    return this.createNewOrder(dto)
  }
 private async addProductToOrder(orderId: number, productId: number, value: number) {
    const existProductInOrder = await this.orderDetailRepository.findOne({where:{
      productId:productId,
      orderId:orderId
    }})
    if(existProductInOrder){
      existProductInOrder.value = ((+ existProductInOrder.value) + (+value))
      existProductInOrder.updatedAt = new Date
      return this.orderDetailRepository.save(existProductInOrder)
    }
    const detailModel:OrderDetail ={
      productId:productId,
      orderId:orderId,
      value:value,
      createdAt:new Date,
    }
    return this.orderDetailRepository.save(
      this.orderDetailRepository.create(detailModel)
    )
  }
  private async createNewOrder(dto: OrderDto) {
    const orderNumber = await this.getOrderNumber()
    const orderModel:Order = {
      orderNumber,
      buyerId:dto.buyerId,
      sellerId:dto.sellerId,
      orderDetails:[
        {
          value: dto.value,
          productId: dto.productId,
        }
      ],
      statusTracking:[
        {
          status: OrderStatus.BUCKET,
          updaterId: dto.buyerId,
          statusDate: new Date,
          reason:''
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
  private async getExistOrder(buyerId: number,sellerId:number){
   const currentOrder = this.getCurrentOrderNumber();
    return this.orderRepository.findOne({
      relations: ['statusTracking'],
      where: [
        {
          orderNumber: Like(`${currentOrder}%`), statusTracking: {
            status: OrderStatus.BUCKET,
          },buyerId
        },

      ]
      , order: { id: 'DESC' }
    })
  }
  private getCurrentOrderNumber():string{
    const date: Date = new Date();
    const month: string = (date.getMonth() < 10) ? (`0` + date.getMonth() + 1) : (date.getMonth() + 1).toString()
    return `${date.getFullYear()}${month}${date.getDate()}`
  }
  async searchOrder(dto:OrderSearchDto){
    return this.orderRepository.find({
      relations:['orderDetails']
    })
  }
}
