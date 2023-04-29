import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { EspMain } from './esp-main.entity';
@Entity()
export class EspChildren extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  mainId: number;
  @ManyToOne(type=> EspMain, type=> type.id)
  main?:EspMain
  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Column({ type: 'bigint', nullable: true })
  pin: number;
  @Column({ type: 'bigint', nullable: true })
  status: number;
  @Column({ type: 'bool', nullable: true })
  isManual: boolean;
}
