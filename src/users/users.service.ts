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

@Injectable()
export class UsersService {
  async login(dto: LoginDto) {    
    const user = await this.userRepository.findOne({select:{
      id:true,
      token:true,
      password:true
    },where:{email:dto.email}})
    console.log('user',user);
    
    if (user) {
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
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly jwtService: JwtService

  ){

  }
  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    const model:User = {
      ...dto,
      password:hashPassword,
      id:undefined,
      createdAt:new Date()
    }
    const response = await this.userRepository.save(this.userRepository.create(model))
    const payload = { id:response.id };
    const token=  this.jwtService.sign(payload);
    return {
      userId:response.id,
      token:token
    }
  }

}
