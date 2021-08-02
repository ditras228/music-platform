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

@WebSocketGateway({ namespace: '/comment' })
export class CommentsGateway implements OnGatewayInit {

    @WebSocketServer() wss: Server;

    private logger: Logger = new Logger('CommentsGateway');

    afterInit(server: any) {
        this.logger.log('Initialized!');
    }

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
        this.wss.to(message.room).emit('chatToClient', message);
    }

    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, room: string ) {
        client.join(room);
        client.emit('joinedRoom', room);
        this.logger.log('123');
    }

    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, room: string ) {
        client.leave(room);
        client.emit('leftRoom', room);
    }

}
