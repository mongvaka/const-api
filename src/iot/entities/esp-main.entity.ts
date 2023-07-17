import { BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EspChildren } from './esp-children.entity';
@Entity()
export class EspMain extends BasicData {
  @Column({ type: 'varchar', nullable: true })
  key: string;
  @Column({ type: 'bigint', nullable: true })
  ownerId: number;
  @ManyToOne(type=>User,type=>type.id)
  owner:User
  @OneToMany(()=>EspChildren, (childrent)=>childrent.main,{cascade:true})
  childrent?:EspChildren[]
}
