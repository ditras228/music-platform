import {Headers, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Album, AlbumDocument} from './schemas/album.schema'
import {Model, ObjectId} from 'mongoose'
import {Track, TrackDocument} from '../track/schemas/track.schema'
import {FileService, FileType} from '../file/file.service'
import {CreateAlbumDto} from './dto/create.album.dto'
import {User, UserDocument} from '../users/schemas/user.schema'
import {Account, AccountDocument} from '../users/schemas/account.schema'
import {CreateCommentDTO} from '../track/dto/add.comment.dto'
import {Comment, CommentDocument} from '../track/schemas/comment.schema'
const getObjectId = require('mongodb').ObjectID;

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name)
                private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name)
                private trackModel: Model<TrackDocument>,
                @InjectModel(User.name)
                private userModel: Model<UserDocument>,
                @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
                private fileService: FileService,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,

    ) {
    }

    async create(dto: CreateAlbumDto, picture, headers): Promise<any> {
        try{
            console.log(dto)
            const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
            const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
            return  await this.albumModel
                .create(
                    {...dto,
                       tracks: JSON.parse(dto.tracks as string),
                       author: dto.author,
                       userId: session.userId,
                       picture: picturePath,
                       listens: 0,
                       created_at: Date()
                    })
        }catch(e){
            console.log(e)
        }

    }

    async getAll(count = 10, offset = 0, headers): Promise<any> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        if (!session) {
            return new HttpException
            (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return this.albumModel.find()//.skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id)
            .populate('tracks')
            .populate({path:'comments', sort: {'created_at': 1}}) as unknown as AlbumDocument
        const comments = album.comments as any
        if (comments.length > 0) {
            for (let i = 0; i < comments.length; i++) {
                const user = await this.userModel.findOne(getObjectId(comments[i].userId)) as unknown as UserDocument
                comments[i].username = user?.name
                comments[i].color = user?.color
                comments[i].image = user?.image
            }
        }
        const tracks = album.tracks as any
        for(let i=0; i<tracks.length;i++){
            album.listens+=tracks[i].listens
        }
        return album
    }

    async delete(id: ObjectId, headers): Promise<any> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        const album = await this.albumModel.findByIdAndDelete(id)
        if(album.userId==session.userId) {
            return await album.remove()
        }
        return new HttpException
        (`Вы не владелец альбома`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async deleteAll(){
        await this.albumModel.deleteMany()

    }

    async edit(headers, albumId: ObjectId, tracks: ObjectId[]): Promise<any> {
        try{
            const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
            const tracksDb =[]
            const album = await this.albumModel.findById(albumId)
            if (session.userId!==album.userId) {
                return new HttpException
                (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            for(let i=0; i< tracks.length; i++){
                const track = await this.trackModel.findById(tracks[i])
                tracksDb.push(track)
            }
            album.tracks= tracksDb
            await album.save()
            return album
        }
        catch(e){
            console.log(e)
        }
    }
    async addComment(@Headers() headers, dto: CreateCommentDTO): Promise<Comment> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        const album = await this.albumModel.findById(dto.albumId)
        const comment = await this.commentModel.create({userId: session.userId, ...dto, created_at: Date()})
        album.comments.push(comment._id)
        await album.save()

        const user = await this.userModel.findById(comment.userId) as unknown as UserDocument
        comment.username = user?.name
        comment.color = user?.color
        comment.image= user?.image
        return comment
    }


    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
    }
}