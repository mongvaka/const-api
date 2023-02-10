import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class Notification extends BasicData {
  @Column({ type: 'bigint', nullable: true })
  shopId: number;
  @Column({ type: 'nvarchar', nullable: true })
  text: number;
  @Column({ type: 'date', nullable: true })
  noticeDate: Date;
  @Column({ type: 'string', nullable: true })
  url: string;
  @Column({ type: 'boolean', nullable: true })
  readed: boolean;
}
