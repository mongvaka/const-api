import { UseGuards, Controller, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { SupportService } from "./support.service";
import { SearchSupportDto } from "./dto/search-support.dto";
import { SearchChatDto } from "./dto/search-chat-message.dto";
import { SendChatDto } from "./dto/send-chat-message.dto";
@ApiTags('Support')
@UseGuards(JwtAuthGuard)
@Controller('support')
@ApiBearerAuth()
export class SupportController {
  constructor(private readonly supportService: SupportService) {}
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
