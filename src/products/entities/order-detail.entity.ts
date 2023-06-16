import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { ProductOption } from './product-option.entity';
@Entity()
export class OrderDetail extends BasicChildrentData {
  @Column({ type: 'bigint', nullable: true })
  value: number;
  @Column({ type: 'bigint', nullable: true })
  orderId?: number;
  @ManyToOne(order=>Order,order=>order.id)
  order?:Order
  @Column({ type: 'bigint', nullable: true })
  productId: number;
  @ManyToOne(product=>Product,product=>product.id)
  product?:Product
  @Column({ type: 'bigint', nullable: true })
  optionId: number;
  @ManyToOne(type=> ProductOption,option => option.id,{onDelete:'CASCADE'})
  option?:ProductOption
  @Column({ type: 'double precision', nullable: false ,default:0})
  price?: number;
}
