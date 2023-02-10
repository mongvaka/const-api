import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class User extends BasicData {
  @Column({ type: 'bigint', nullable: false })
  user: number;
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: false })
  userType: string;
  @Column({ type: 'text', nullable: true })
  token: string;
  @Column({ type: 'text', nullable: true })
  firstName: string;
  @Column({ type: 'text', nullable: true })
  lastName: string;
}
