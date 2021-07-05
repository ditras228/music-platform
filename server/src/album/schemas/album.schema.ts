import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import {Track} from '../../track/schemas/track.schema'
import * as mongoose from 'mongoose'

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    _id: string

    @Prop()
    userId: string

    @Prop()
    name: string

    @Prop()
    picture: string

    @Prop()
    author: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album)