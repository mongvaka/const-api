import { Injectable } from "@nestjs/common";
import { Support } from "./entities/support.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SupportDetail } from "./entities/support-detail.entity";
import { SendChatDto } from "./dto/send-chat-message.dto";
import { SearchChatDto } from "./dto/search-chat-message.dto";
import { SearchSupportDto } from "./dto/search-support.dto";
import { BasicResponseDto, Pageable } from "src/shared/basics/basic-response.dto";
import { BasicsearchDto } from "src/shared/basics/basic-search.dto";
import { getRespones } from "src/shared/functions/respone-function";
import { EspService } from "src/iot/esp.service";

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private readonly supportRepository: Repository<Support>,
    @InjectRepository(SupportDetail)
    private readonly supportDetailRepository: Repository<SupportDetail>,
    private readonly espService:EspService
  ) {

  }
  async sendChatMessage(dto:SendChatDto){
    const findExistSupport = await this.findExistSupportByCustomerId(dto.clientId);
    if(findExistSupport){
      dto.supportId = findExistSupport.id
      return this.createMessage(dto);
    }
    return this.createSupportAndMessage(dto)
  }
  async emitChatMessageSupport(clientId:string,dto:SendChatDto){
    this.espService.emitMessageSupport(clientId,dto)
  }
  private async findExistSupportByCustomerId(clientId: number) {
    return this.supportRepository.findOne({where:{customerId:clientId}})
  }
  private async createSupportAndMessage(dto: SendChatDto) {
    const supportModel:Support = {
      customerId:dto.clientId
    }
    const supportResult = await this.supportRepository.save(
      this.supportRepository.create(supportModel)
    )
    const supportDetail:SupportDetail = {
      supportId: supportResult.id,
      message: dto.message,
      type: dto.type,
      answerId: dto.answerId
    }
    this.emitChatMessageSupport(dto.clientId.toString(),dto)

    return this.supportDetailRepository.save(
      this.supportDetailRepository.create(supportDetail)
    )
  }
  private async createMessage(dto:SendChatDto) {
    const model:SupportDetail = {
      supportId:dto.supportId,
      type:dto.type,
      answerId:dto.answerId,
      message:dto.message,
      createdAt:new Date()
    }
    this.emitChatMessageSupport(dto.clientId.toString(),dto)
    return this.supportDetailRepository.save(
      this.supportDetailRepository.create(model)
    )
  }
  async searchChatMessage(dto:SearchChatDto){
    const data = await this.supportDetailRepository.find({
      relations: ['support','answer'],
      select: {
        answer:{
          firstName:true,
          lastName:true,
          id:true,
          email:true
        },
        support:{
          customerId:true,
          customer:{
            firstName:true,
            lastName:true,
            id:true,
            email:true
          }
        },
        message:true,
        type:true,
        
      },
      where: {
       support :{customerId: dto.clientId}
      },
      order:{createdAt:'DESC'},
    });
    return getRespones(data,dto);
    
  }

  async searchSupport(dto:SearchSupportDto){
    const data = await this.supportRepository.find({
      relations: ['customer'],
      select: {
        customer:{
          firstName:true,
          lastName:true,
          id:true,
          email:true
        },
        customerId:true,
      },
    });
    return getRespones(data,dto);
  }
  
}
