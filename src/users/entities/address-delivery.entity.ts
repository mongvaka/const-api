import { Country } from 'src/address/entities/country.entity';
import { District } from 'src/address/entities/district.entity';
import { Province } from 'src/address/entities/province.entity';
import { SubDistrict } from 'src/address/entities/sub-district.entity';
import { BasicChildrentData, BasicData } from 'src/shared/basics/basic-data';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity()
export class AddressDelivery extends BasicChildrentData {
  @Column({ type: 'bigint', nullable: false })
  userId: number;
  @ManyToOne(user=>User,user=>user.id,{onDelete:'CASCADE'})
  user:User
  @Column({ type: 'varchar', nullable: false })
  address: string;
  @Column({ type: 'varchar', nullable: false })
  phoneNumber: string;

  @Column({ type: 'bigint', nullable: false })
  subDistrictCode: number;
  @ManyToOne(subDistrict=>SubDistrict,subDistrict=>subDistrict.code)
  subDistrict:SubDistrict

  @Column({ type: 'bigint', nullable: false })
  districtCode: number;
  @ManyToOne(district=>District,district=>district.code)
  district:District

  @Column({ type: 'bigint', nullable: false })
  provinceCode: number;
  @ManyToOne(province=>Province,province=>province.code)
  province:Province

  @Column({ type: 'bigint', nullable: false })
  countryCode: number;
  @ManyToOne(country=>Country,country=>country.code)
  country:Country

  @Column({ type: 'boolean', nullable: false })
  isPrimary: number;
}
