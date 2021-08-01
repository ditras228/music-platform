import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import {Logger} from '@nestjs/common'
import {Server, Socket} from 'socket.io'

@WebSocketGateway(4001)
export class CommentsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server
    private logger: Logger = new Logger('CommentsGateway');

    @SubscribeMessage('sendComment')
    handleEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ) {
        this.server.emit('addComment', data)
        this.logger.log(`test`);
       // return data;
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}