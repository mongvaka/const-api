import { BasicData } from "src/shared/basics/basic-data";
import { Column, Connection, Entity, PrimaryColumn, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";

@Entity('country')
export class Country  {
  @PrimaryColumn({nullable: false,type:'varchar'})
  code?: string;

  @Column({nullable: false})
  name?: string;
}

