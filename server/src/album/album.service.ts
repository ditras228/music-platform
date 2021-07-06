import {Headers, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Album, AlbumDocument} from './schemas/album.schema'
import {Model, ObjectId} from 'mongoose'
import {Track, TrackDocument} from '../track/schemas/track.schema'
import {FileService, FileType} from '../file/file.service'
import {CreateAlbumDto} from './dto/create.album.dto'
import {User, UserDocument} from '../users/schemas/user.schema'
import jwt = require('jsonwebtoken')

@Injectable()
export class AlbumService {
    constructor(@InjectModel(Album.name)
                private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name)
                private trackModel: Model<TrackDocument>,
                @InjectModel(User.name)
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

    async edit(headers, albumId, tracks): Promise<Track[]> {
        try{
            console.log(albumId, tracks)
            const album = await this.albumModel.findById(albumId)
            console.log(album)
            const added=tracks.filter((e: any)=>album.tracks.findIndex((i:any)=>i._id===e._id)===-1)
            const deleted=album.tracks.filter((e: any)=>tracks.findIndex((i:any)=>i._id===e._id)===-1)

            added.map(track=>track.albumsId=albumId)
            deleted.filter(track=>track.albumsId=albumId)
            const newTracks=added.concat(deleted)

            album.tracks = tracks
            for(let i=0;i<newTracks.length;i++){
                await newTracks[i].save()

            }
            return album.tracks
        }
        catch(e){
            console.log(e)
        }
    }


    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
    }
}