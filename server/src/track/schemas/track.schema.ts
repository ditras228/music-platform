import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import * as mongoose from 'mongoose'
import {Album} from '../../album/schemas/album.schema'

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string

    @Prop()
    userId: string

    @Prop()
    artist: string

    @Prop()
    text: string

    @Prop()
    listens: number

    @Prop()
    picture: string

    @Prop()
    audio: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[]
}

export const TrackSchema = SchemaFactory.createForClass(Track)