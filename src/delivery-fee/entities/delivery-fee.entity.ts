import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class DeliveryFee extends BasicData {
  @Column({ type: 'nvarchar', nullable: true })
  name: string;
  @Column({ type: 'double precision', nullable: true })
  price: number;
  @Column({ type: 'int8', nullable: true })
  minUnit: string;
  @Column({ type: 'int8', nullable: true })
  maxUnit: string;
  @Column({ type: 'int8', nullable: true })
  distance: number;
}
