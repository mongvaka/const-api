import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity } from 'typeorm';
@Entity()
export class EspChildren extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  mainId: number;
  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Column({ type: 'bigint', nullable: true })
  pin: number;
  @Column({ type: 'bigint', nullable: true })
  status: number;
  @Column({ type: 'bool', nullable: true })
  isManual: boolean;
}
