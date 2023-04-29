import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EspChildren } from './esp-children.entity';
@Entity()
export class EspSchedule extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  childrentId: number;
  @ManyToOne(type=> EspChildren,espChildrent => espChildrent.id)
  childrent?:EspChildren
  @Column({ type: 'time', nullable: false })
  startTime: Date;
  @Column({ type: 'time', nullable: false })
  endTime: Date;
}
