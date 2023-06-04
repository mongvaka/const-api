import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { Observable, of } from 'rxjs';
@ApiTags('ForTest')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(':name')
  @ApiParam({name:'name',type:String})
  findProfileImage(@Param('name') imagename, @Res() res): Observable<Object> {
      return of(res.sendFile(join(process.cwd(), 'uploads/chat-images/' + imagename)));
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
