import { Injectable } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { SubDistrict } from './entities/sub-district.entity';
import { SearchProvinceDto } from './dto/search-province.dto';
import { SearchDistrictDto } from './dto/search-district.dto';
import { SearchSubDistrictDto } from './dto/search-sub-district.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(SubDistrict)
    private readonly subDistrictRepository: Repository<SubDistrict>,
  ) {
  }
  async getCountry(){
    return this.countryRepository.find({select:{
      code:true,
      name:true,
    }});
  }
  async getProvince(dto:SearchProvinceDto){
    return this.provinceRepository.find({where:{countryCode:dto.countryCode}})
  }
  async getDistrict(dto:SearchDistrictDto){
    return this.districtRepository.find({where:{provinceCode:dto.provinceCode}})
  }
  async getSubDistrict(dto:SearchSubDistrictDto){
    return this.subDistrictRepository.find({where:{districtCode:dto.districtCode}})
  }
}
