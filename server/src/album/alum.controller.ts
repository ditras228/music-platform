import {Headers, Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common'
import {ObjectId} from 'mongoose'
import {FileFieldsInterceptor} from '@nestjs/platform-express'
import {CreateAlbumDto} from './dto/create.album.dto'
import {AlbumService} from './album.service'

@Controller('/albums')
export class TrackController {
    [x: string]: any;

    constructor(private trackService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))

    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files
        return this.trackService.create(dto, picture[0])
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset)
    }
    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query)
    }
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id)
    }
    @Delete()
    deleteAll() {
        return this.trackService.deleteAll()
    }

}

