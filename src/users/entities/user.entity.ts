import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, OneToMany } from 'typeorm';
import { AddressDelivery } from './address-delivery.entity';
@Entity()
export class User extends BasicData {
  @Column({ type: 'text', nullable: false })
  email: string;
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: true })
  userType?: string;
  @Column({ type: 'text', nullable: true })
  token?: string;
  @Column({ type: 'text', nullable: true })
  firstName?: string;
  @Column({ type: 'text', nullable: true })
  lastName?: string;
  @OneToMany(()=>AddressDelivery, (address)=>address.user,{cascade:true})
  address?:AddressDelivery[]
}
