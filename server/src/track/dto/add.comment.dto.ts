import { ObjectId } from 'mongoose';

export class CreateCommentDTO {
  readonly username: string;
  readonly text: string;
  readonly trackId: ObjectId;
  readonly albumId: ObjectId;
}
