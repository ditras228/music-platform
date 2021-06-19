import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Album, AlbumDocument} from './schemas/album.schema'
import {Model, ObjectId} from 'mongoose'
import {Track, TrackDocument} from '../track/schemas/track.schema'
import {FileService, FileType} from '../file/file.service'
import {Headers} from '@nestjs/common'
import jwt = require('jsonwebtoken')
import {CreateAlbumDto} from './dto/create.album.dto'
import {CreateTrackDto} from '../track/dto/create.track.dto'

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Track.name) private albumModel: Model<AlbumDocument>,
                @InjectModel(Comment.name) private trackModel: Model<TrackDocument>,
                private fileService: FileService
    ) {
    }

    async create(dto: CreateAlbumDto, picture)/*: Promise<Track> */{
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        //return this.albumModel.create({...dto, picture: picturePath})
    }

    async getAll(count = 10, offset = 0)/*: Promise<Track[]>*/ {
       // return this.albumModel.find().skip(Number(offset)).limit(Number(count))
    }

    async getOne(id: ObjectId)/*: Promise<Track>*/ {
       // return this.albumModel.findById(id).populate('tracks')
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.albumModel.findByIdAndDelete(id)
        return track._id

    }

    async deleteAll(): Promise<string> {
        await this.albumModel.deleteMany()
        return 'nuked'

    }

    async addTrack(@Headers() headers, dto: CreateTrackDto)/*: Promise<Comment> */{
        const {userId}= jwt.verify(headers.authorization, process.env.SECRET) as any
        const album = await this.albumModel.findById(dto.albumId)
      //  album.tracks.push(track._id)
        await album.save()
      //  return track
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