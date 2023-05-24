import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { EspService } from './esp.service';
import { ActivateDto, ChildDto, CreateSheduleDto, DeleteSheduleDto, EspChildSearchDto, EspRegisterDto, PreActivateDto, SwitchDto, SwitchStatusDto } from './dto/esp-register.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
@ApiTags('Esp')
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
  @Post('pre-activate')
  preActivate(@Body() dto: PreActivateDto) {
    return this.espService.preActivate(dto);
  }
  @Post('activate')
  activate(@Body() dto: ActivateDto) {
    return this.espService.activate(dto);
  }
}
