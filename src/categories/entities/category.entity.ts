import { BasicData } from 'src/shared/basics/basic-data';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BasicData {
  @Column({ type: 'varchar', nullable: false })
  code: string;
  @Column({ type: 'varchar', nullable: true })
  name: string;
}
