import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection,
    OnGatewayDisconnect, OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(PORT, () => console.log(`server started on port ${PORT} `))
        //const http=require('http').Server(app)
        //const io = require("socket.io")(http)



        const users=[]
        const connections =[]


        // io.socket.on('connection', function (socket){
        //     connections.push(socket)
        //     socket.on('disconnect', function (data){
        //        connections.splice(connections.indexOf(socket), 1)
        //     })
        //     socket.on('sendComment',function (data){
        //         io.socket.emit('addComment', data)
        //     })
        // })


    } catch (e) {
        console.log(e)
    }
}
start()

@WebSocketGateway()
export class CommentsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server
    private logger: Logger = new Logger('AppGateway');
    @SubscribeMessage('sendComment')
    handleMessage(@MessageBody() data): void {
        this.server.emit('addComment', data)
        console.log('test')
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