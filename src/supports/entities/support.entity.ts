import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Entity()
export class Support extends BasicData {
  @Column({ type: 'bigint', nullable: false })
  customerId: number;
  @ManyToOne(user=> User, user=> user.id)
  customer?:User
}
