import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class ProductImage extends BasicChildrentData {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  url: string;
  @Column({ type: 'varchar', nullable: false })
  type: string;
  @Column({ type: 'bigint', nullable: true })
  productId?: number;
  @ManyToOne(type=> Product,product => product.id,{onDelete:'CASCADE'})
  product?:Product

}
