import { Injectable } from '@nestjs/common';
// import { ChatGateway } from './chat.gateway';

@Injectable()
export class AppService {
  constructor(
    // private readonly socketGateway:ChatGateway
  ){

  }
  // emitMessage(pin: number, status: number): string {
  //   this.socketGateway.server.emit('hola', {pin,status});
  //    return 'Ok'
  // }
  getHello(): string {
    return 'Hello World test ssh deploy hello auto8';
  }
}
