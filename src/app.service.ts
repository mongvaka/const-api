import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ){

  }
  emitMessage(channel: string, message: string): string {
     return 'Ok'
  }
  getHello(): string {
    return 'Hello World test ssh deploy hello';
  }
}
