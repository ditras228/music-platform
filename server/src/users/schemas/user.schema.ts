import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import * as mongoose from 'mongoose'
import {IAlbum} from '../../../../client/types/album'
import {Track} from '../../track/schemas/track.schema'

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    nickname: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[]

    @Prop()
    roles: Array<string>
}

export const UserSchema = SchemaFactory.createForClass(User)