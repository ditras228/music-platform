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

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                @InjectModel(User.name) private userModel: Model<UserDocument>,
                private fileService: FileService
    ) {
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        return this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
    }

    async getAll(count = 10, offset = 0, headers): Promise<any> {
        const token = jwt.sign(headers.authorization, process.env.SECRET)
        if(!token){
            return new HttpException
            (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return this.trackModel.find().skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track= this.trackModel.findById(id).populate('comments') as unknown as TrackDocument
        track.comments.map((comment: any)=> {
          const {username}=  this.userModel.findById(comment.userId) as unknown as UserDocument
          comment.username=username
        })
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id

    }

    async deleteAll(): Promise<string> {
        await this.trackModel.deleteMany()
        return 'nuked'

    }

    async addComment(@Headers() headers, dto: CreateCommentDTO): Promise<Comment> {
        const {userId}= jwt.verify(headers.authorization, process.env.SECRET) as any
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({userId,...dto})
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