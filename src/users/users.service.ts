import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from './dto/get-user.dto';
import { VerifyMobileDto } from './dto/verify-mobile.dto';
import { CreateAddressDto } from 'src/users/dto/create-address.dto';
import { AddressDelivery } from './entities/address-delivery.entity';
import { EditUserProfileDto } from './dto/edit-user-profile.dto';
import { GetSensorDto } from './dto/get-sensor.dto';
import { SensorResponse } from './response/sensor.response';
import { EspMain } from 'src/iot/entities/esp-main.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    @InjectRepository(AddressDelivery)
    private readonly addressDeliveryRepository:Repository<AddressDelivery>,
    @InjectRepository(EspMain)
    private readonly espMainRepository:Repository<EspMain>,
    private readonly jwtService: JwtService

  ){

  }
  async getSensor(dto: GetSensorDto) {
    const model: SensorResponse = new SensorResponse();
    const dataPure = await this.espMainRepository.find({ relations:['childrent'],where:{ownerId:dto.userId}})
    model.controllerCount =dataPure[0]?.childrent.length??0;
    model.homSensor = 0;
    model.lightSensor = 0;
    model.tempSensor = 0;
    model.sensorCount = 0;
    return model;
  }

  async verifyMobile(dto: VerifyMobileDto) {
    const verify = await this.userRepository.findOne({select:{mobileVerify:true,},where:{id:dto.userId}})
    return verify.mobileVerify
  }
  async getUser(dto: GetUserDto) {
    const resunt = await this.userRepository.findOne(
      {
        relations:[
          'address',
          'address.country',
          'address.province',
          'address.district',
          'address.subDistrict'
        ],select:{
          id:true,
      lastName:true,
      firstName:true,
      email:true,
      address:{
        address:true,
        userId:true,
        phoneNumber:true,
        countryCode:true,
        provinceCode:true,
        districtCode:true,
        subDistrictCode:true,
        country:{
          name:true
        },
        province:{
          name:true
        },
        district:{
          name:true
        },
        subDistrict:{
          name:true,
          postCode:true
        }
      }
    }
    
    ,where:{id:dto.id}})
    console.log('resunt',resunt);
    
    return resunt
  }
  async login(dto: LoginDto) {    
    const user = await this.userRepository.findOne({select:{
      id:true,
      token:true,
      password:true,email:true
    },where:{email:dto.email}})    
    if (user) {
      console.log('user',user);
      
      const match = await bcrypt.compare(dto.password, user.password);
      if (match) {
        const payload = { id:user.id };
        const token=  this.jwtService.sign(payload);
        return {
          userId:user.id,
          token:token
        }
      }
      throw Error('รหัสผ่านไม่ถูกต้อง')
    }
    throw Error('ไม่พบผู้ใช้')
  }

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    const model:User = {
      ...dto,
      password:hashPassword,
      id:undefined,
      mobile:'',
      mobileVerify:false,
      createdAt:new Date(),
      firstName:dto.fName,
      lastName:dto.lName
    }
    const response = await this.userRepository.save(this.userRepository.create(model))
    const payload = { id:response.id };
    const token=  this.jwtService.sign(payload);
    return {
      userId:response.id,
      token:token
    }
  }
  async createAddress(dto:CreateAddressDto){
    const model:AddressDelivery = {
      userId: dto.userId,
      address: dto.address,
      phoneNumber: dto.phoneNumber,
      subDistrictCode: dto.subDistrictCode,
      districtCode: dto.districtCode,
      provinceCode: dto.provinceCode,
      countryCode: dto.countryCode,
      isPrimary: true,
      id:undefined,
    }
    return this.addressDeliveryRepository.save(
      this.addressDeliveryRepository.create(model)
    )
  }


  async editUserProfile(dto: EditUserProfileDto) {
    console.log('dto : ',dto);
    const model = await this.userRepository.findOne({where:{id:dto.id}})
    console.log('model : ',model);
    
    model.firstName = dto.fName;
    model.lastName = dto.lName;
    model.updatedAt = new Date()
    model.updatedById = dto.id
    return this.userRepository.save(model);
  }
}
