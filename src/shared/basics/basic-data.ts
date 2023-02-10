import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BasicData {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column({ default: true })
  active?: boolean;

  @Column({ default: false })
  deleted?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: true })
  deletedBy?: string;
}
