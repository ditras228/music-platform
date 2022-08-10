import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Track } from './track.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  image: string;

  @Prop()
  color: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;

  @Prop()
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
