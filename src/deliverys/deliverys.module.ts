import { Module } from '@nestjs/common';
import { DeliverysService } from './deliverys.service';
import { DeliverysController } from './deliverys.controller';

@Module({
  controllers: [DeliverysController],
  providers: [DeliverysService]
})
export class DeliverysModule {}
