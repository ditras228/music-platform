import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './dto/create.album.dto';
import { AlbumService } from './album.service';
import { EditAlbumDto } from './dto/edit.album.dto';
import { CreateCommentDTO } from '../track/dto/add.comment.dto';

@Controller('/albums')
export class AlbumController {
  [x: string]: any;

  constructor(private albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @Headers() headers,
    @UploadedFiles() files,
    @Body() dto: CreateAlbumDto,
  ) {
    const { picture } = files;
    return this.albumService.create(dto, picture[0], headers);
  }
  @Post('/edit')
  edit(@Headers() headers, @Body() dto: EditAlbumDto) {
    return this.albumService.edit(headers, dto.albumId, dto.tracks);
  }
  @Get()
  getAll(
    @Headers() headers,
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.albumService.getAll(count, offset, headers);
  }
  @Get('/search')
  search(@Headers() headers, @Query('query') query: string) {
    return this.albumService.search(query);
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Delete(':id')
  delete(@Headers() headers, @Param('id') id: ObjectId) {
    return this.albumService.delete(id, headers);
  }
  @Delete()
  deleteAll(@Headers() headers) {
    return this.albumService.deleteAll();
  }
  @Post('/comment')
  addComment(@Headers() headers, @Body() dto: CreateCommentDTO) {
    return this.albumService.addComment(headers, dto);
  }
}
