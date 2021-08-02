import {Headers, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Album, AlbumDocument} from './schemas/album.schema'
import {Model, ObjectId} from 'mongoose'
import {Track, TrackDocument} from '../track/schemas/track.schema'
import {FileService, FileType} from '../file/file.service'
import {CreateAlbumDto} from './dto/create.album.dto'
import {User, UserDocument} from '../users/schemas/user.schema'
import jwt = require('jsonwebtoken')
import {Account, AccountDocument} from "../users/schemas/account.schema";
import {Session, SessionDocument} from "../users/schemas/session.schema";
import {CreateCommentDTO} from '../track/dto/add.comment.dto'
import {Comment, CommentDocument} from '../track/schemas/comment.schema'
import {io} from 'socket.io-client'
const  mongoose = require('mongoose');
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
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        const tracks=[]
        for(let i=0; i<dto.tracks; i++){
            tracks.push(await this.trackModel.findById(mongoose.Types.ObjectId(dto.tracks[i])))
        }
        return  await this.albumModel.create({...dto,tracks: tracks, userId: session.userId._id, picture: picturePath})

    }

    async getAll(count = 10, offset = 0, headers): Promise<any> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        if (!session) {
            return new HttpException
            (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return this.albumModel.find().skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId): Promise<Album> {
        return this.albumModel.findById(id).populate('tracks')
    }

    async delete(id: ObjectId, headers): Promise<any> {
        const session = await this.accountModel.findOne({accessToken: headers.authorization.split(' ')[1]})
        const album = await this.albumModel.findByIdAndDelete(id)
        if(album.userId==session.userId._id) {
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
            if (session.userId._id!==album.userId) {
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
        const comment = await this.commentModel.create({userId: session.userId, ...dto})
        album.comments.push(comment._id)
        await album.save()

        const socket = io()
        socket.emit('addComment', album)
        return comment
    }


    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
    }
}