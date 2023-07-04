import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ProductComment } from './product-comment.entity';
import { ProductOption } from './product-option.entity';
import { Category } from './category.entity';
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
  @Column({ type: 'int', nullable: false,default:0 })
  sold?: number;
  @OneToMany(()=>ProductImage, (images)=>images.product,{cascade:true})
  images?:ProductImage[]
  @OneToMany(()=>ProductComment, (comment)=>comment.product,{cascade:true})
  comment?:ProductComment[]
  @OneToMany(()=>ProductOption, (option)=>option.product,{cascade:true})
  options?:ProductOption[]
  @Column({ type: 'bigint', nullable: true})
  categoryId?: number;
  @ManyToOne(cat=>Category,cat=>cat.id)
  category?:Category
}
