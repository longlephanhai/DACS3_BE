import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseFilters, UploadedFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('avatar')
  @Public()
  @ResponseMessage('File uploaded successfully')
  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(new HttpExceptionFilter())
  create(@UploadedFile() file: Express.Multer.File,) {
    return {
      fileName: file.filename,
    }
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
