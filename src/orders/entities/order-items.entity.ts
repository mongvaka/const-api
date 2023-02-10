import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class OrderItems extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  orderId: number;
  @Column({ type: 'bigint', nullable: true })
  optionId: number;
  @Column({ type: 'bigint', nullable: true })
  productId: number;
  @Column({ type: 'double precision', nullable: true })
  price: number;
  @Column({ type: 'nvarchar', nullable: true })
  productCode: string;
  @Column({ type: 'nvarchar', nullable: true })
  productName: string;
  @Column({ type: 'int8', nullable: true })
  value: number;
  @Column({ type: 'nvarchar', nullable: true })
  unit: string;
}
