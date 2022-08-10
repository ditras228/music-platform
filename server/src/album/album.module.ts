import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from '../file/file.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Track, TrackSchema } from '../track/schemas/track.schema';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Account, AccountSchema } from '../users/schemas/account.schema';
import { Comment, CommentSchema } from '../track/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
})
export class AlbumModule {}
