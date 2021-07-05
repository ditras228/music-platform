import {Headers, Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common'
import {ObjectId} from 'mongoose'
import {FileFieldsInterceptor} from '@nestjs/platform-express'
import {CreateAlbumDto} from './dto/create.album.dto'
import {AlbumService} from './album.service'

@Controller('/albums')
export class AlbumController {
    [x: string]: any;

    constructor(private albumService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))

    create(@Headers()  headers,@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files
        return this.albumService.create(dto, picture[0], headers)
    }

    @Get()
    getAll(@Headers()  headers,
           @Query('count') count: number,
           @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset, headers)
    }
    @Get('/search')
    search(@Headers()  headers,@Query('query') query: string) {
        return this.albumService.search(query)
    }
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }
    @Post()
    editTracks(@Headers() headers, @Body() albumId, tracks) {
        return this.albumService.editTracks(headers, albumId,tracks )
    }
    @Delete(':id')
    delete(@Headers()  headers, @Param('id') id: ObjectId) {
        return this.albumService.delete(id, headers)
    }
    @Delete()
    deleteAll(@Headers()  headers) {
        return this.albumService.deleteAll()
    }

}

