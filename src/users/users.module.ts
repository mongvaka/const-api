import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { AddressDelivery } from './entities/address-delivery.entity';
import { EspMain } from 'src/iot/entities/esp-main.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,AddressDelivery,EspMain]),
    JwtModule.register({
      secret: 'clEciwpf4p',
    })
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[UsersService,JwtStrategy]
})
export class UsersModule {}
