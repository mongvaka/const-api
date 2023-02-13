import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
export function getUserDeviceRoom(userId: string, deviceId: string) {
  return `user:${userId}-device:${deviceId}`;
}
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit{
  handleDisconnect(client: any) {

    
  }
  afterInit(server: any) {
    console.log('afterInit :',server);
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('Connected',client)


  }

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    
    this.server.emit('message', message+'fromserver');
    this.server.emit('hola', message+'holar');
  }
}
