import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
@Entity()
export class ProductComment extends BasicChildrentData {
  @Column({ type: 'text', nullable: false })
  comment: string;
  @Column({ type: 'bigint', nullable: true })
  commentorId: number;
  @ManyToOne(comment=>User,comment=>comment.id)
  commentor:User
  @Column({ type: 'bigint', nullable: true })
  productId: number;
  @ManyToOne(product=>User,product=>product.id)
  product:Product
  @Column({ type: 'double precision', nullable: false })
  rating: number;
  @Column({ type: 'bigint', nullable: true })
  orderId: number;
  @ManyToOne(order=>Order,order=>order.id)
  order:Order
}
