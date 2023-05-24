import { BasicData } from "src/shared/basics/basic-data";
import { Column, Connection, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Province } from "./province.entity";

@Entity('district')
export class District  {
  @Column({nullable: false})
  provinceCode?: string;

  @ManyToOne(province=>Province,province=>province.code)
  province:Province
  
  @PrimaryColumn({nullable: false,type:'varchar'})
  code?: string;

  @Column({nullable: false})
  name?: string;
}

