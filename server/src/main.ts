import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(PORT, () => console.log(`server started on port ${PORT} `))
        const io = require("socket.io").listen(app)



        const users=[]
        const connections =[]

        io.socket.on('connection', function (socket){
            connections.push(socket)
            socket.on('disconnect', function (data){
               connections.splice(connections.indexOf(socket), 1)
            })
            socket.on('sendComment',function (data){
                io.socket.emit('addComment', data)
            })
        })


    } catch (e) {
        console.log(e)
    }
}
start()

