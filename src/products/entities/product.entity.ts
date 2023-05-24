import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductComment } from './product-comment.entity';
@Entity()
export class Product extends BasicData {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  code: string;
  @Column({ type: 'text', nullable: true })
  detail: string;
  @Column({ type: 'double precision', nullable: true })
  rating?: number;
  @OneToMany(()=>ProductImage, (images)=>images.product,{cascade:true})
  images?:ProductImage[]
  @OneToMany(()=>ProductComment, (comment)=>comment.product,{cascade:true})
  comment?:ProductComment[]
}
