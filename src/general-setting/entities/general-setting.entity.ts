import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class GeneralSetting extends BasicData {
  @Column({ type: 'nvarchar', nullable: true })
  language: string;
}
