import { BasicData } from "src/shared/basics/basic-data";
import { Column, Connection, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, ViewColumn, ViewEntity } from "typeorm";
import { Country } from "./country.entity";

@Entity('province')
export class Province {
  @Column({nullable: false})
  countryCode?: string;

  @ManyToOne(country=>Country,country=>country.code)
  country:Country

  @PrimaryColumn({nullable: false,type:'varchar'})
  code?: string;
  
  @Column({nullable: false})
  name?: string;
}