import { BasicData } from "src/shared/basics/basic-data";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends BasicData {
  @Column({ type: 'text', nullable: false })
  name: string;
  @Column({ type: 'text', nullable: false })
  description: string;
}