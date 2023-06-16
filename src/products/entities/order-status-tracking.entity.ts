import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
export enum OrderStatus{
  BUCKET = 'Bucket',
  BUYER_CONFIRM = 'BuyerConfirm',
  CANCELED = 'Canceled',
  DELIVERED = 'Delivered',
  COMLETED = 'Completed',
}
@Entity()
export class OrderStatusTracking extends BasicChildrentData {
  @Column({ type: 'bigint', nullable: false })
  orderId?: number;
  @ManyToOne(order=> Order,order => order.id,{onDelete:'CASCADE'})
  order?:Order
  @Column({ type: 'enum',enum: OrderStatus, nullable: true,default: OrderStatus.BUCKET})
  status: OrderStatus;
  @Column({ type: 'bigint', nullable: true })
  updaterId: number;
  @ManyToOne(type=>User,type=>type.id)
  updater?:User
  @Column({ type: 'timestamp', nullable: false })
  statusDate: Date;
  @Column({ type: 'varchar', nullable: true })
  reason?: string;


}
