import { Injectable } from '@nestjs/common';
// import { ChatGateway } from 'src/chat.gateway';
import { EspChildSearchDto, EspRegisterDto, SwitchDto, SwitchStatusDto } from './dto/esp-register.dto';
import { EspMain } from './entities/esp-main.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { EspType } from 'src/shared/constans/enum-constans';
import { EspChildren } from './entities/esp-children.entity';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BasicResponseDto, Pageable } from 'src/shared/basics/basic-response.dto';

@Injectable()
@WebSocketGateway()
export class EspService implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit {
  constructor(
    @InjectRepository(EspMain)
    private readonly espMainRepository:Repository<EspMain>,
    @InjectRepository(EspChildren)
    private readonly espChildrenRepository:Repository<EspChildren>,
  ){

  }
  async switchStatus(dto: SwitchStatusDto) {
    const model = await this.espChildrenRepository.findOne({where:{id:dto.id,pin:dto.pin}})
    model.status = dto.status
    await this.espChildrenRepository.save(model)
    this.server.emit(dto.key, {pin:dto.pin,status:dto.status});
    return true
  }
  async listEspChild(dto: EspChildSearchDto) {
    dto.name = ''
    const data = await this.espChildrenRepository.find({
    relations:['main'],
    select:{
      id:true,
      name:true,
      status:true,
      pin:true,
      main:{
        id:true,
        key:true,
        ownerId:true,
      },
    },
    where:{
      name:Like(`%${dto.name}%`),
      main:{ownerId:2}
    }});
    const result = new BasicResponseDto();
    const count = data.length
    const limit = dto.limit??10
    const empty = data.length == 0
    result.content = data;
    result.empty = count == 0;
    result.first = dto.offset ==1;
    result.last = true;
    result.numberOfElements = 0;
    result.totalPages = Math.ceil(count / limit);
    result.number = dto.offset
    result.pageable = new Pageable()
    result.pageable.sort = {
      empty,
      sorted: true,
      unsorted: false
    }
    result.pageable.offset = dto.offset
    result.pageable.pageNumber = dto.offset
    result.pageable.pageSize = dto.limit
    result.pageable.paged = true
    result.pageable.unpaged = false    
    return result
  }

  async register(dto: EspRegisterDto) {
   const main =  await this.espMainRepository.findOne({where:{key:dto.key}})
    if(main){
      return this.espChildrenRepository.find({select:['pin','status'],where:{mainId:main.id}})
    }
    const  model:EspMain = new EspMain()
    model.key = dto.key
    const mainResult = await this.espMainRepository.save(
      this.espMainRepository.create(model)
    )
    await this.createChildren(dto.type,mainResult.id);
    return 'Ok'
  }
 async createChildren(type: EspType, id: number) {
    const children:EspChildren[] = this.getChildren(type,id);
    await this.espChildrenRepository.save(
      this.espChildrenRepository.create(children)
    )
  }
  getChildren(type: EspType,id:number):EspChildren[] {
    switch (type){
      case EspType.V1:
      return [{isManual:true,mainId:id,pin:4,status:1,name:'switch1',id:undefined},{isManual:true,mainId:id,pin:5,status:1,name:'switch2',id:undefined}]
      default:
        return[]
    }
  }
  
  handleDisconnect(client: any) {
  }
  async emitMessage(dto:SwitchDto): Promise<string> {
    const model = await this.espChildrenRepository.findOne({where:{mainId:dto.mainId,pin:dto.pin}})
    model.status = dto.status
    await this.espChildrenRepository.save(model)
    this.server.emit(dto.key, {pin:dto.pin,status:dto.status});
     return 'Ok'
  }
  getHello(): string {
    return 'Hello World test ssh deploy hello';
  }
  afterInit(server: any) {
    console.log('afterInit :',server);
  }
  handleConnection(client: any, ...args: any[]) {


  }

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('hola', {header:'headerText',detail:'detailText'});
  }
}
