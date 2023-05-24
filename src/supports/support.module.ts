import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupportController } from "./support.controller";
import { SupportService } from "./support.service";
import { Support } from "./entities/support.entity";
import { SupportDetail } from "./entities/support-detail.entity";


@Module({
  imports:[
    TypeOrmModule.forFeature([Support,SupportDetail]),
  ],
  controllers: [SupportController],
  providers: [SupportService]
})
export class SupportModule {}
