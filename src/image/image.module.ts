import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    })
  ]
})
export class ImageModule { }
