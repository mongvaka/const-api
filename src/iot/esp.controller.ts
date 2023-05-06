import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { EspService } from './esp.service';
import { ChildDto, CreateSheduleDto, DeleteSheduleDto, EspChildSearchDto, EspRegisterDto, SwitchDto, SwitchStatusDto } from './dto/esp-register.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { get } from 'http';
@UseGuards(JwtAuthGuard)
@Controller('esp')
@ApiBearerAuth()
export class EspController {
  constructor(private readonly espService: EspService) {}
  @Post('child')
  child(@Body() dto: ChildDto) {
    return this.espService.childById(dto);
  }
  @Post('create-schedule')
  createSchedule(@Body() dto: CreateSheduleDto) {
    return this.espService.createSchedule(dto);
  }
  @Post('delete-schedule')
  deleteSchedule(@Body() dto: DeleteSheduleDto) {
    return this.espService.deleteSchedule(dto);
  }
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
