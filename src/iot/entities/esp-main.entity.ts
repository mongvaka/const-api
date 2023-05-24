import { BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity()
export class EspMain extends BasicData {
  @Column({ type: 'varchar', nullable: true })
  key: string;
  @Column({ type: 'bigint', nullable: true })
  ownerId: number;
  @ManyToOne(type=>User,type=>type.id)
  owner:User

}
