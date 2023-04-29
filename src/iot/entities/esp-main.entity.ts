import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity } from 'typeorm';
@Entity()
export class EspMain extends BasicData {
  @Column({ type: 'varchar', nullable: true })
  key: string;
  @Column({ type: 'bigint', nullable: true })
  ownerId: number;

}
