import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BasicData {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number = undefined;
  @Column({ default: true })
  active?: boolean;

  @Column({ default: false })
  deleted?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  createdById?: string;
  @ManyToOne(type=>User,type=>type.id)
  createdBy?:User

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  updatedById?: number;
  @ManyToOne(type=>User,type=>type.id)
  updatedBy?:User

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: true })
  deletedBy?: string;
}
export class BasicChildrentData {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}
