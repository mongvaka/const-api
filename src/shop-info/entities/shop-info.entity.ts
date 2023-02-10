import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class ShopInfo {}
export class Order extends BasicData {
  @Column({ type: 'nvarchar', nullable: true })
  shopName: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'double precision', nullable: true })
  lat: number;
  @Column({ type: 'double precision', nullable: true })
  lon: number;
}
