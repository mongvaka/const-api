import { Module } from '@nestjs/common';
import { EspService } from './esp.service';
import { EspController } from './esp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspMain } from './entities/esp-main.entity';
import { EspChildren } from './entities/esp-children.entity';
// import { ChatGateway } from 'src/chat.gateway';

@Module({
  imports:[
    TypeOrmModule.forFeature([EspMain,EspChildren])
  ],
  controllers: [EspController],
  providers: [EspService]
})
export class EspModule {}
