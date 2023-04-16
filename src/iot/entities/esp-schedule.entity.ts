import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity } from 'typeorm';
@Entity()
export class EspSchedule extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  childrentId: number;
  @Column({ type: 'time', nullable: false })
  startTime: Date;
  @Column({ type: 'time', nullable: false })
  endTime: Date;
}
