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

  private connectedClients: Set<Socket> = new Set();
  private pendingRequests: Map<string, boolean> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client);
    this.pendingRequests.delete(client.id);
  }

  @SubscribeMessage('new message')
  async handleNewMessage(
    client: Socket,
    data: { username: string; message: string },
  ) {
    if (this.pendingRequests.get(client.id)) {
      return;
    }

    this.pendingRequests.set(client.id, true);

    try {
      console.log(`${client['username']} : ${data.message}`);
      const response = {
        username: client['username'],
        message: data.message,
      };
      this.server.emit('new message', response);
    } finally {
      this.pendingRequests.delete(client.id);
    }
  }
}
