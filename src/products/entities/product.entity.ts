import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class Product extends BasicData {
  @Column({ type: 'nvarchar', nullable: false })
  code: string;
  @Column({ type: 'nvarchar', nullable: false })
  name: string;
  @Column({ type: 'double precision', nullable: false })
  price: number;
  @Column({ type: 'bigint', nullable: false })
  categoryId: number;
  @Column({ type: 'bigint', nullable: false })
  deliveryFeeId: number;
  @Column({ type: 'int8', nullable: false })
  stock: number;
}
