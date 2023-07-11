import { Injectable } from '@nestjs/common';
// import { ChatGateway } from 'src/chat.gateway';
import { ActivateDto, ChildDto, CreateSheduleDto, DeleteSheduleDto, EspChildSearchDto, EspRegisterDto, PreActivateDto, SwitchDto, SwitchStatusDto } from './dto/esp-register.dto';
import { EspMain } from './entities/esp-main.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { EspType } from 'src/shared/constans/enum-constans';
import { EspChildren } from './entities/esp-children.entity';
import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BasicResponseDto, Pageable } from 'src/shared/basics/basic-response.dto';
import { EspSchedule } from './entities/esp-schedule.entity';
import { UsersService } from 'src/users/users.service';
import { getRespones } from 'src/shared/functions/respone-function';
import { SendChatDto } from 'src/supports/dto/send-chat-message.dto';

@Injectable()
@WebSocketGateway()
export class EspService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  async deleteSchedule(dto: DeleteSheduleDto) {
    return this.espChildrenRepository.remove(
      await this.espChildrenRepository.findOne({ where: { id: dto.id } })
    )
  }
  constructor(
    @InjectRepository(EspMain)
    private readonly espMainRepository: Repository<EspMain>,
    @InjectRepository(EspChildren)
    private readonly espChildrenRepository: Repository<EspChildren>,
    private readonly userService: UsersService,
  ) {

  }
  async createSchedule(dto: CreateSheduleDto) {
    const modelMain = await this.espChildrenRepository.findOne({ where: { id: dto.id } })
    modelMain.isManual = dto.isManual
    modelMain.name = dto.name
    modelMain.schedule = dto.schedule.map((m) => {
      return {
        startTime: m.startTime,
        endTime: m.endTime
      }
    })
    return this.espChildrenRepository.save(modelMain)
  }
  async childById(dto: ChildDto) {
    return this.espChildrenRepository.findOne({
      relations: ['schedule'], select: {
        name: true,
        id: true,
        status: true,
        isManual: true,
        schedule: {
          id: true,
          startTime: true,
          endTime: true
        }
      }, where: {
        id: dto.id
      }
    })
  }

  async switchStatus(dto: SwitchStatusDto) {
    const model = await this.espChildrenRepository.findOne({ where: { id: dto.id, pin: dto.pin } })
    model.status = dto.status
    await this.espChildrenRepository.save(model)
    this.server.emit(dto.key, { pin: dto.pin, status: dto.status });
    return true
  }
  async emitMessageSupport(clientId:String,dto:SendChatDto) {
    console.log('dto.answerId',dto.answerId);
    let awnserModel = null;
    if(dto.answerId!=null){
      awnserModel = await this.userService.getUser({id:dto.answerId})
    }
    console.log('awnserModel',awnserModel);
    
    const user = awnserModel==null?null:{
      id:awnserModel.id,
      firstname:awnserModel.firstName,
      lastname:awnserModel.lastName,
      email:awnserModel.email
    }
    this.server.emit(`message${clientId}`, {...dto,answer:user});
    return true
  }
  async listEspChild(dto: EspChildSearchDto) {
    console.log(dto);

    const data = await this.espChildrenRepository.find({
      relations: ['main'],
      select: {
        id: true,
        name: true,
        status: true,
        pin: true,
        main: {
          id: true,
          key: true,
          ownerId: true,
        },
      },
      where: {
        main: { ownerId: dto.ownerId }
      },
      order:{
        name:'ASC'
      }
    });
    return getRespones(data,dto);
  }

  async register(dto: EspRegisterDto) {
    const main = await this.espMainRepository.findOne({ where: { key: dto.key } })
    if (main) {
      return this.espChildrenRepository.find({ select: ['pin', 'status'], where: { mainId: main.id } })
    }
    const model: EspMain = new EspMain()
    model.key = dto.key
    const mainResult = await this.espMainRepository.save(
      this.espMainRepository.create(model)
    )
    await this.createChildren(dto.type, mainResult.id);
    return 'Ok'
  }
  async createChildren(type: EspType, id: number) {
    const children: EspChildren[] = this.getChildren(type, id);
    await this.espChildrenRepository.save(
      this.espChildrenRepository.create(children)
    )
  }
  getChildren(type: EspType, id: number): EspChildren[] {
    switch (type) {
      case EspType.V1:
        return [{ isManual: true, mainId: id, pin: 4, status: 1, name: 'switch1', id: undefined }]
        case EspType.V8:
          return [
            { isManual: true, mainId: id, pin: 16, status: 0, name: 'ตัวควบคุม1', id: undefined },
            { isManual: true, mainId: id, pin: 14, status: 0, name: 'ตัวควบคุม2', id: undefined },
            { isManual: true, mainId: id, pin: 12, status: 0, name: 'ตัวควบคุม3', id: undefined },
            { isManual: true, mainId: id, pin: 13, status: 0, name: 'ตัวควบคุม4', id: undefined },
            { isManual: true, mainId: id, pin: 15, status: 0, name: 'ตัวควบคุม5', id: undefined },
            { isManual: true, mainId: id, pin: 0, status: 0, name: 'ตัวควบคุม6', id: undefined },
            { isManual: true, mainId: id, pin: 4, status: 0, name: 'ตัวควบคุม7', id: undefined },
            { isManual: true, mainId: id, pin: 5, status: 0, name: 'ตัวควบคุม8', id: undefined },
          ]
      default:
        return []
    }
  }

  handleDisconnect(client: any) {
  }
  async emitMessage(dto: SwitchDto): Promise<string> {
    const model = await this.espChildrenRepository.findOne({ where: { mainId: dto.mainId, pin: dto.pin } })
    model.status = dto.status
    await this.espChildrenRepository.save(model)
    this.server.emit(dto.key, { pin: dto.pin, status: dto.status });
    return 'Ok'
  }
  getHello(): string {
    return 'Hello World test ssh deploy hello';
  }
  afterInit(server: any) {
  }
  handleConnection(client: any, ...args: any[]) {


  }

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('hola', { header: 'headerText', detail: 'detailText' });
  }
  async preActivate(dto: PreActivateDto) {
    console.log('this dto',dto);
    
    const m = await this.espMainRepository.find({
      relations:[
        'owner'
      ],
      select: {
        key: true,
        ownerId: true,
        owner: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      where: {
        key: In(dto.keys)
      }
    }
    )
    console.log(m);
    console.log('this dto',dto.keys);
    return m;

  }
  async activate(dto: ActivateDto) {
    console.log('thisDto',dto);
    
    if(dto.email&&dto.password){
      const login = await this.userService.login({email:dto.email,password:dto.password})
      if(!login){
        return null;
      }
    }
    const model =await this.espMainRepository.findOne({
      where: {
        key: dto.key
      }
    }
    )
    console.log(model);
    
    model.ownerId = dto.ownerId
    model.updatedAt = new Date()
    try{
      await this.espMainRepository.save(model)

    }catch(e){
      console.log(e);
      
    }
    return this.espMainRepository.findOne({
      select: {
        key: true,
        ownerId: true,
        owner: {
          firstName: true,
          lastName: true,
          email: true
        }
      },
      where: {
        key: dto.key
      }
    }
    )

  }

}
