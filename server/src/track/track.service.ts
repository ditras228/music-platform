import {Headers, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Track, TrackDocument} from './schemas/track.schema'
import {Model, ObjectId} from 'mongoose'
import {CreateTrackDto} from './dto/create.track.dto'
import {Comment, CommentDocument} from './schemas/comment.schema'
import {CreateCommentDTO} from './dto/add.comment.dto'
import {FileService, FileType} from '../file/file.service'
import {User, UserDocument} from '../users/schemas/user.schema'
import jwt = require('jsonwebtoken')
import {Session, SessionDocument} from '../users/schemas/session.schema'
import {Account, AccountDocument} from "../users/schemas/account.schema";

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
                @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
                private fileService: FileService
    ) {
    }

    async create(dto: CreateTrackDto, picture, audio, headers): Promise<Track> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        console.log('headers')
        console.log(headers)
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        return this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath, userId:session.userId})
    }

    async getAll(count = 10, offset = 0, headers): Promise<any> {
        console.log(headers)
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        if(!session){
            return new HttpException
            (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return this.trackModel.find().skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track= await this.accountModel.findById(id).populate('comments') as unknown as TrackDocument
        const comments = track.comments as unknown as CommentDocument[]
        for(let i=0;i<comments.length;i++){
            const user=  await this.userModel.findById(comments[i].userId) as unknown as UserDocument
            comments[i].username=user.name
            comments[i].color=user.color
        }
        return track
    }

    async delete(id: ObjectId, headers): Promise<any> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        const track = await this.trackModel.findById(id)
        if(track.userId===session.accessToken) {
            track.remove()
        }
        return new HttpException
        (`Вы не владелец трека`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async deleteAll(): Promise<string> {
        await this.trackModel.deleteMany()
        return 'nuked'

    }

    async addComment(@Headers() headers, dto: CreateCommentDTO): Promise<Comment> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({userId: session.userId, ...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }

    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
    }
}