import {TrackModule} from './track/track.module'
import {MongooseModule} from '@nestjs/mongoose'
import {FileModule} from './file/file.module'
import {UserModule} from './users/user.module'
import {ServeStaticModule} from '@nestjs/serve-static'
import * as path from 'path'
import {Module} from '@nestjs/common'
import {AlbumModule} from './album/album.module'
import {CommentsGateway} from './comment.gateway'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        TrackModule,
        AlbumModule,
        FileModule,
        UserModule,
    ]
})
export class AppModule{}