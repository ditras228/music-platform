import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Track } from '../../track/schemas/track.schema';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  author: string;

  @Prop()
  listens: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop()
  created_at: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
