/* eslint-disable prettier/prettier */
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

  private numUsers = 0;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    if (client['username']) {
      --this.numUsers;
      console.log(`Disconnected: ${client.id}, Total Users: ${this.numUsers}`);
    }
  }

  @SubscribeMessage('new message')
  handleNewMessage(
    client: Socket,
    data: { username: string; message: string },
  ) {
    console.log(`${client['username']} : ${data.message}`);
    const response = {
      username: client['username'],
      message: data.message,
    };
    this.server.emit('new message', response);
  }

  @SubscribeMessage('add user')
  handleAddUser(client: Socket, username: string) {
    if (client['username']) return;

    client['username'] = username;
    ++this.numUsers;
    console.log(`Connected: ${client.id}, Total Users: ${this.numUsers}`);
    client.emit('login', { numUsers: this.numUsers });
    client.broadcast.emit('user joined', {
      username: username,
      numUsers: this.numUsers,
    });
  }
}
