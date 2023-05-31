import { UseGuards, Controller, Post, Body, Get, Param, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { SupportService } from "./support.service";
import { SearchSupportDto } from "./dto/search-support.dto";
import { SearchChatDto } from "./dto/search-chat-message.dto";
import { SendChatDto } from "./dto/send-chat-message.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { Observable, of } from "rxjs";
import { storage, storageChat } from "src/shared/constans/constans";
@ApiTags('Support')
@UseGuards(JwtAuthGuard)
@Controller('support')
@ApiBearerAuth()
export class SupportController {
  constructor(private readonly supportService: SupportService) {}
  @Get('image/:name')
  @ApiParam({name:'name',type:String})
  findProfileImage(@Param('name') imagename, @Res() res): Observable<Object> {
      return of(res.sendFile(join(process.cwd(), 'uploads/chat-images/' + imagename)));
  }
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', storageChat))
  uploadFile(@UploadedFile() file) {
  return file.filename
  }
  @Post('search-support')
  searchPeoduct(@Body() dto:SearchSupportDto) {
    return this.supportService.searchSupport(dto);
  }
  @Post('search-chat-message')
  searchChatMessage(@Body() dto:SearchChatDto) {
    return this.supportService.searchChatMessage(dto);
  }
  @Post('send-message')
  sendMessage(@Body() dto:SendChatDto) {
    return this.supportService.sendChatMessage(dto);
  }
}
