import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class Order extends BasicData {
  @Column({ type: 'nvarchar', nullable: true })
  orderNumber: string;
  @Column({ type: 'bigint', nullable: true })
  customerId: number;
  @Column({ type: 'nvarchar', nullable: true })
  deliveryAddress: string;
  @Column({ type: 'nvarchar', nullable: true })
  status: string;
  @Column({ type: 'double precision', nullable: true })
  lat: number;
  @Column({ type: 'double precision', nullable: true })
  lon: number;
}
