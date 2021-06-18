import {TrackModule} from './track/track.module'
import {MongooseModule} from '@nestjs/mongoose'
import {FileModule} from './file/file.module'
import {UserModule} from './users/user.module'
import {ServeStaticModule} from '@nestjs/serve-static'
import * as path from 'path'
import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common'
import {Role} from './middleware/role.middleware'
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb+srv://ditras228:redcommunist5@cluster0.4v2u1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority\n' +
            '\n'),
        TrackModule,
        FileModule,
        UserModule
    ]   
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(Role(['ADMIN', 'USER']))
            .forRoutes('/tracks', '/comment')

    }
}
