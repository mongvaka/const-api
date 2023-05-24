import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressService } from "./address.service";
import { Module } from "@nestjs/common";
import { Country } from "./entities/country.entity";
import { Province } from "./entities/province.entity";
import { District } from "./entities/district.entity";
import { SubDistrict } from "./entities/sub-district.entity";
import { AddressController } from "./address.controller";

@Module({
    imports:[
      TypeOrmModule.forFeature([Country,Province,District,SubDistrict]),
    ],
    controllers: [AddressController],
    providers: [AddressService]
  })
  export class AddressModule {}