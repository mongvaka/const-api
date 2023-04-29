import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { EspService } from './esp.service';
import { EspChildSearchDto, EspRegisterDto, SwitchDto, SwitchStatusDto } from './dto/esp-register.dto';
@Controller('esp')
export class EspController {
  constructor(private readonly espService: EspService) {}

  @Post('switch')
  emitMessage(@Body() dto: SwitchDto) {
    return this.espService.emitMessage(dto);
  }
  @Post('register')
  create(@Body() dto: EspRegisterDto) {
    return this.espService.register(dto);
  }
  @Post('esp-child')
  listEspChild(@Body() dto: EspChildSearchDto) {
    return this.espService.listEspChild(dto);
  }
  @Post('switch-status')
  switchStatus(@Body() dto: SwitchStatusDto) {
    return this.espService.switchStatus(dto);
  }
}
