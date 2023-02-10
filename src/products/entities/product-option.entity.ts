import { BasicData } from 'src/shared/basics/basic-data';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class ProductOption {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ type: 'nvarchar', nullable: false })
  name: string;
  @Column({ type: 'nvarchar', nullable: true })
  description: string;
  @Column({ type: 'double precision', nullable: false })
  price: number;
}
