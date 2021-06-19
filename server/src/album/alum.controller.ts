import {Headers, Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common'
import {ObjectId} from 'mongoose'
import {FileFieldsInterceptor} from '@nestjs/platform-express'
import {CreateAlbumDto} from './dto/create.album.dto'
import {AlbumService} from './album.service'

@Controller('/albums')
export class TrackController {
    [x: string]: any;

    constructor(private albumService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))

    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files
        return this.albumService.create(dto, picture[0])
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset)
    }
    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query)
    }
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }
    @Post()
    addTrack(@Headers() headers, @Body() albumId, trackId) {
        return this.albumService.addTrack(headers, albumId,trackId )
    }
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }
    @Delete()
    deleteAll() {
        return this.albumService.deleteAll()
    }

}

