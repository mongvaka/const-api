import { Injectable } from '@nestjs/common';
// import { ChatGateway } from 'src/chat.gateway';
import { EspRegisterDto } from './dto/esp-register.dto';
import { EspMain } from './entities/esp-main.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspType } from 'src/shared/constans/enum-constans';
import { EspChildren } from './entities/esp-children.entity';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@Injectable()
@WebSocketGateway()
export class EspService implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit {

  async register(dto: EspRegisterDto) {
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
  constructor(
    @InjectRepository(EspMain)
    private readonly espMainRepository:Repository<EspMain>,
    @InjectRepository(EspChildren)
    private readonly espChildrenRepository:Repository<EspChildren>,
  ){

  }
  handleDisconnect(client: any) {
    throw new Error('Method not implemented.');
  }
  emitMessage(pin: number, status: number): string {
    this.server.emit('hola', {pin,status});
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
