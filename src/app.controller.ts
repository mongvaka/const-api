import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('ForTest')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get('emit/:pin/:status')
  // @ApiParam({
  //   name: "pin",
  //   type: Number,
  //   description: "pin",
  // })
  // @ApiParam({
  //   name: "status",
  //   type: Number,
  //   description: "status",
  // })
  // emitMessage(@Param("pin") pin: number,@Param("status") status: number): string {
  //   return this.appService.emitMessage(pin,status);
  // }
}
