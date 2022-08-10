import { Headers, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create.track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDTO } from './dto/add.comment.dto';
import { FileService, FileType } from '../file/file.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Session, SessionDocument } from '../users/schemas/session.schema';
import { Account, AccountDocument } from '../users/schemas/account.schema';

const ObjectId = require('mongodb').ObjectID;

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio, headers): Promise<Track> {
    try {
      const session = await this.accountModel.findOne({
        accessToken: headers.authorization.split(' ')[1],
      });
      console.log('headers');
      console.log(headers);
      const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
      const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
      return this.trackModel.create({
        ...dto,
        listens: 0,
        audio: audioPath,
        picture: picturePath,
        userId: session.userId,
        created_at: Date(),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(count = 10, offset = 0, headers): Promise<any> {
    console.log(headers);
    const session = await this.accountModel.findOne({
      accessToken: headers.authorization.split(' ')[1],
    });
    if (!session) {
      return new HttpException(
        `Токен не валиден`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.trackModel.find(); //.skip(Number(offset)).limit(Number(count))
  }

  async getOne(id: ObjectId): Promise<any> {
    const track = ((await this.trackModel.findById(id).populate({
      path: 'comments',
      sort: { created_at: 1 },
    })) as unknown) as TrackDocument;
    const comments = track.comments as any;
    if (comments.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        const user = ((await this.userModel.findOne(
          ObjectId(comments[i].userId),
        )) as unknown) as UserDocument;
        comments[i].username = user?.name;
        comments[i].color = user?.color;
        comments[i].image = user?.image;
      }
    }
    if (!track) {
      return new HttpException(`Трека не существует`, HttpStatus.BAD_REQUEST);
    }
    return track;
  }

  async delete(id: ObjectId, headers): Promise<any> {
    const session = await this.accountModel.findOne({
      accessToken: headers.authorization.split(' ')[1],
    });
    const track = await this.trackModel.findById(id);
    console.log(track.userId);
    console.log(session.userId);
    if (track.userId.toString() == session.userId.toString()) {
      await track.remove();
      return track._id;
    }
    return new HttpException(
      `Вы не владелец трека`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async deleteAll(): Promise<string> {
    await this.trackModel.deleteMany();
    return 'nuked';
  }

  async addComment(
    @Headers() headers,
    dto: CreateCommentDTO,
  ): Promise<Comment> {
    const session = await this.accountModel.findOne({
      accessToken: headers.authorization.split(' ')[1],
    });
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({
      userId: session.userId,
      ...dto,
      created_at: Date(),
    });
    track.comments.push(comment._id);
    await track.save();

    const user = ((await this.userModel.findById(
      comment.userId,
    )) as unknown) as UserDocument;
    comment.username = user?.name;
    comment.color = user?.color;
    comment.image = user?.image;
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
  }
}
