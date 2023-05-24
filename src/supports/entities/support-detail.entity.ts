import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Support } from './support.entity';
export enum MessageType{
  MESSAGE = 'Message',
  IMAGE = 'Image',
  VIDEO = 'Video',
  FILE = 'File'
}
@Entity()
export class SupportDetail extends BasicChildrentData {
  @Column({ type: 'bigint', nullable: false })
  supportId: number;
  @ManyToOne(support=>Support,support=>support.id)
  support?:Support
  @Column({ type: 'varchar', nullable: false })
  message: string;
  @Column({ type: 'enum',enum: MessageType, nullable: true,default: MessageType.MESSAGE})
  type: MessageType;
  @Column({ type: 'bigint', nullable: false })
  awnserId: number;
  @ManyToOne(awnser=>User,awnser=>awnser.id)
  awnser?: User;
}
