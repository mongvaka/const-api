import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EspChildren } from './esp-children.entity';
@Entity()
export class EspSchedule extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  childrentId?: number;
  @ManyToOne(type=> EspChildren,espChildrent => espChildrent.id,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  childrent?:EspChildren
  @Column({ type: 'time', nullable: false })
  startTime: string;
  @Column({ type: 'time', nullable: false })
  endTime: string;
}
