import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductComment } from './product-comment.entity';
import { Product } from './product.entity';
@Entity()
export class ProductOption extends BasicChildrentData {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'double precision', nullable: true })
  price?: number;
  @Column({ type: 'bigint', nullable: true })
  productId?: number;
  @ManyToOne(type=> Product,product => product.id,{onDelete:'CASCADE'})
  product?:Product
}
