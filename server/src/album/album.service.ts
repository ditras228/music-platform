import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Album, AlbumDocument} from './schemas/album.schema'
import {Model, ObjectId} from 'mongoose'
import {Track, TrackDocument} from '../track/schemas/track.schema'
import {FileService, FileType} from '../file/file.service'
import {Headers} from '@nestjs/common'
import {CreateAlbumDto} from './dto/create.album.dto'
import jwt = require('jsonwebtoken')
import {IAlbum} from '../../../client/types/album'
import {UserDocument} from '../users/schemas/user.schema'

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name)
                private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name)
                private trackModel: Model<TrackDocument>,
                private userModel: Model<UserDocument>,
                private fileService: FileService
    ) {
    }

    async create(dto: CreateAlbumDto, picture, headers): Promise<any> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const album = await this.albumModel.create({...dto, picture: picturePath})
        const {userId}= jwt.verify(headers.authorization, process.env.SECRET) as any

        const user = await this.userModel.findById(userId)
        for (let i = 0; i < dto.tracks.length; i++) {
            const track = await this.trackModel.findById(dto.tracks[i])
            track.albumsId.push(album)
            user.tracks.push(track)
            await track.save()
        }
        await user.save()
        return album
    }

    async getAll(count = 10, offset = 0, headers): Promise<any> {
        const token = jwt.sign(headers.authorization, process.env.SECRET)
        if (!token) {
            return new HttpException
            (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return this.albumModel.find().skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId): Promise<Album> {
        return this.albumModel.findById(id).populate('tracks')
    }

    async delete(id: ObjectId, headers): Promise<any> {
        const {userId} = jwt.verify(headers.authorization, process.env.SECRET) as any
        const album = await this.albumModel.findByIdAndDelete(id)
        if(album.userId===userId) {
            return await album.remove()
        }
        return new HttpException
        (`Вы не владелец альбома`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async deleteAll(){
        await this.albumModel.deleteMany()

    }

    async addTrack(@Headers() headers, albumId, trackId): Promise<Track> {
        const album = await this.albumModel.findById(albumId) as AlbumDocument
        const track = await this.trackModel.findById(trackId) as TrackDocument
        album.tracks.push(track._id)
        track.albumsId.push(album._id)
        await album.save()
        await track.save()
        return track
    }


    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
    }
}