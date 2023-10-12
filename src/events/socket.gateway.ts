import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(3030)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  handleMessage(client: any, message: string): void {
    this.server.emit('chat', message);
  }
}
