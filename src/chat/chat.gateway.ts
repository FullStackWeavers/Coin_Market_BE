/* eslint-disable prettier/prettier */
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

  private rooms: Record<string, string[]> = {};

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {
    this.leaveAllRooms(client); // 연결 끊긴 클라이언트가 모든 방에서 나가도록 함
  }

  private joinRoom(client: Socket, coin: string) {
    client.join(coin);
    if (!this.rooms[coin]) {
      this.rooms[coin] = [];
    }
    this.rooms[coin].push(client.id);
  }

  private leaveRoom(client: Socket, coin: string) {
    client.leave(coin);
    if (this.rooms[coin]) {
      this.rooms[coin] = this.rooms[coin].filter((id) => id !== client.id);
    }
  }

  private leaveAllRooms(client: Socket) {
    for (const coin of Object.keys(this.rooms)) {
      this.leaveRoom(client, coin);
    }
  }

  @SubscribeMessage('join room')
  async handleJoinRoom(client: Socket, roomName: string) {
    this.joinRoom(client, roomName);
  }

  @SubscribeMessage('leave room')
  async handleLeaveRoom(client: Socket, coin: string) {
    this.leaveRoom(client, coin);
  }

  @SubscribeMessage('new message')
  async handleNewMessage(
    client: Socket,
    data: { photo: string; email: string; message: string; room: string },
  ) {
    const response = {
      photo: data.photo,
      email: data.email,
      message: data.message,
    };
    this.server.to(data.room).emit('new message', response);
  }
}
