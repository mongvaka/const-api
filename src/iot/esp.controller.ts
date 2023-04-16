import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { EspService } from './esp.service';
import { EspRegisterDto } from './dto/esp-register.dto';
@Controller('esp')
export class EspController {
  constructor(private readonly espService: EspService) {}

  @Get('emit/:pin/:status')
  @ApiParam({
    name: "pin",
    type: Number,
    description: "pin",
  })
  @ApiParam({
    name: "status",
    type: Number,
    description: "status",
  })
  emitMessage(@Param("pin") pin: number,@Param("status") status: number): string {
    return this.espService.emitMessage(pin,status);
  }
  @Post('register')
  create(@Body() dto: EspRegisterDto) {
    return this.espService.register(dto);
  }
}
