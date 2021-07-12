import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, } from 'mongoose'
import * as mongoose from 'mongoose'
import {User} from './user.schema'
export type SessionDocument = Session & Document;

@Schema()
export class Session {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User

    @Prop()
    expires: Date

    @Prop()
    sessionToken: string

    @Prop()
    accessToken: string

    @Prop()
    created_at: Date

    @Prop()
    updated_at: Date

}

export const SessionSchema = SchemaFactory.createForClass(Session)