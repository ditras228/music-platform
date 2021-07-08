import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, } from 'mongoose'
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    hash: string

    @Prop()
    email_verified: boolean

    @Prop()
    image: string

    @Prop()
    password: string

    @Prop()
    created_at: { type: Date}

    @Prop()
    updated_at:{ type: Date}

}

export const UserSchema = SchemaFactory.createForClass(User)