import {
  Headers,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create.track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDTO } from './dto/add.comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  [x: string]: any;

  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @Headers() headers,
    @UploadedFiles() files,
    @Body() dto: CreateTrackDto,
  ) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0], headers);
  }

  @Get()
  getAll(
    @Headers() headers,
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.trackService.getAll(count, offset, headers);
  }
  @Get('/search')
  search(@Headers() headers, @Query('query') query: string) {
    return this.trackService.search(query);
  }
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Headers() headers, @Param('id') id: ObjectId) {
    return this.trackService.delete(id, headers);
  }
  @Delete()
  deleteAll(@Headers() headers) {
    return this.trackService.deleteAll();
  }
  @Post('/comment')
  addComment(@Headers() headers, @Body() dto: CreateCommentDTO) {
    return this.trackService.addComment(headers, dto);
  }

  @Post('/listen/:id')
  listen(@Headers() headers, @Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
