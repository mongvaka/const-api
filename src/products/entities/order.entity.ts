import { BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderStatusTracking } from './order-status-tracking.entity';
import { OrderDetail } from './order-detail.entity';
@Entity()
export class Order extends BasicData {
  @Column({ type: 'varchar', nullable: true })
  orderNumber: string;
  @Column({ type: 'bigint', nullable: true })
  buyerId: number;
  @ManyToOne(buyer=>User,buyer=>buyer.id)
  buyer?:User
  @Column({ type: 'timestamp', nullable: true })
  oderDate?: Date;
  @Column({ type: 'bigint', nullable: true })
  sellerId: number;
  @ManyToOne(seller=>User,seller=>seller.id)
  seller?:User
  @OneToMany(()=>OrderStatusTracking, (tracking)=>tracking.order,{cascade:true})
  statusTracking?:OrderStatusTracking[]
  @OneToMany(()=>OrderDetail, (orderDetails)=>orderDetails.order,{cascade:true})
  orderDetails?:OrderDetail[]
}
