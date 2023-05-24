import { BasicData } from "src/shared/basics/basic-data";
import { Column, Connection, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { District } from "./district.entity";

@Entity('sub_district')
export class SubDistrict {
  @Column({nullable: false})
  districtCode?: string;
  
  @ManyToOne(district=>District,district=>district.code)
  district:District

  @PrimaryColumn({nullable: false,type:'varchar'})
  code?: string;

  @Column({nullable: false})
  name?: string;

  @Column({nullable: false})
  postCode?: string;
}


