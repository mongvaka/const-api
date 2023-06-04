import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupportController } from "./support.controller";
import { SupportService } from "./support.service";
import { Support } from "./entities/support.entity";
import { SupportDetail } from "./entities/support-detail.entity";
import { EspModule } from "src/iot/esp.module";
import { UsersModule } from "src/users/users.module";


@Module({
  imports:[
    TypeOrmModule.forFeature([Support,SupportDetail]),
    EspModule,
    UsersModule
  ],
  controllers: [SupportController],
  providers: [SupportService]
})
export class SupportModule {}
