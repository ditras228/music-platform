import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, } from 'mongoose'
import * as mongoose from 'mongoose'
import {User} from './user.schema'

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User

    @Prop()
    accessToken: string

    @Prop()
    created_at: Date

    @Prop()
    updated_at: Date

}

export const AccountSchema = SchemaFactory.createForClass(Account)