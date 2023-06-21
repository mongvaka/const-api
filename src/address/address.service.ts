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
import { getRespones } from 'src/shared/functions/respone-function';
import { BasicsearchDto } from 'src/shared/basics/basic-search.dto';
import { VerifyOptDto } from './dto/verify-otp.dto';
import { Twilio } from "twilio";
import { VerifyMobileDto } from 'src/users/dto/verify-mobile.dto';
import { VerifyPhoneNumberDto } from './dto/verify-phone-number.dto';
import { CreateAddressDto } from '../users/dto/create-address.dto';
const accountSid = "AC39157a1fcdda4fcf1771d06a63839549";

const authToken = '1de7bd1c0034f520a6e027daa8581443';
const verifySid = "VA1e0a217f2a87b99089a13d06c3dfe7bc";
// const client = require("twilio")(accountSid, '1de7bd1c0034f520a6e027daa8581443');
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
    const data = await this.countryRepository.find({select:{
      code:true,
      name:true,
    }});
    return getRespones(data,new BasicsearchDto())
  }
  async getProvince(dto:SearchProvinceDto){
    const data = await this.provinceRepository.find({where:{countryCode:dto.countryCode}})
    return getRespones(data,new BasicsearchDto())
  }
  async getDistrict(dto:SearchDistrictDto){
    const data = await this.districtRepository.find({where:{provinceCode:dto.provinceCode}})
    return getRespones(data,new BasicsearchDto())

  }
  async getSubDistrict(dto:SearchSubDistrictDto){
    const data = await this.subDistrictRepository.find({where:{districtCode:dto.districtCode}})
    return getRespones(data,new BasicsearchDto())

  }
  async verifyPhoneNumber(dto:VerifyPhoneNumberDto){
    const client = new Twilio(accountSid, authToken);

    const result = await client.verify.v2.services(verifySid).verifications.create({
      to:dto.phoneNumber,
      channel:"sms",
    })
    return result
  }
  async verifyOtpCode(dto:VerifyOptDto){
      const client = new Twilio(accountSid, authToken);
      const result = await client.verify.v2.services(verifySid).verificationChecks
      .create({
        to:dto.phoneNumber,
        code:dto.otpCode
      })
      return result
  }
}
