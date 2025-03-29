import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/image/multer.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    })
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
