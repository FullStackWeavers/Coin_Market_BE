/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('new message')
  async handleNewMessage(
    client: Socket,
    data: { photo: string; email: string; message: string },
  ) {
    const response = {
      photo: data.photo,
      email: data.email,
      message: data.message,
    };
    this.server.emit('new message', response);
  }
}
