import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Album, AlbumDocument} from './schemas/album.schema'
import {Model, ObjectId} from 'mongoose'
import {Track, TrackDocument} from '../track/schemas/track.schema'
import {FileService, FileType} from '../file/file.service'
import {Headers} from '@nestjs/common'
import {CreateAlbumDto} from './dto/create.album.dto'
import jwt = require('jsonwebtoken')

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name)
                private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name)
                private trackModel: Model<TrackDocument>,
                private fileService: FileService
    ) {
    }

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        return this.albumModel.create({...dto, picture: picturePath})
    }

    async getAll(count = 10, offset = 0, headers): Promise<any>{
        const token = jwt.sign(headers.authorization, process.env.SECRET)
        if(!token){
            return new HttpException
            (`Токен не валиден`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
       return this.albumModel.find().skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId): Promise<Album> {
       return this.albumModel.findById(id).populate('tracks')
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findByIdAndDelete(id)
        return album._id
    }

    async deleteAll(): Promise<string> {
        await this.albumModel.deleteMany()
        return 'nuked'

    }

    async addTrack(@Headers() headers, albumId,trackId): Promise<Track> {
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