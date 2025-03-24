import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/image/multer.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    })
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
