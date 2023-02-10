import { BasicData } from 'src/shared/basics/basic-data';
import { Column } from 'typeorm';

export class PaymentMethod extends BasicData {
  @Column({ type: 'nvarchar', nullable: false })
  accountNumber: string;
  @Column({ type: 'nvarchar', nullable: false })
  accountName: string;
  @Column({ type: 'nvarchar', nullable: false })
  bankName: string;
  @Column({ type: 'nvarchar', nullable: true })
  branch: string;
  @Column({ type: 'nvarchar', nullable: false })
  type: string;
}
