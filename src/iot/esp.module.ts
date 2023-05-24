import { Module } from '@nestjs/common';
import { EspService } from './esp.service';
import { EspController } from './esp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspMain } from './entities/esp-main.entity';
import { EspChildren } from './entities/esp-children.entity';
import { EspSchedule } from './entities/esp-schedule.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from 'src/users/jwt-strategy';
// import { ChatGateway } from 'src/chat.gateway';

@Module({
  imports:[
    TypeOrmModule.forFeature([EspMain,EspChildren,EspSchedule]),
    UsersModule
  ],
  controllers: [EspController],
  providers: [EspService]
})
export class EspModule {}
