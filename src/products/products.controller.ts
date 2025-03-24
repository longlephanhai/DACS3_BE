import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ResponseMessage('Create a new product')
  @UseInterceptors(FileInterceptor('image'))
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createProductDto: CreateProductDto, @User() user: IUser, @UploadedFile() image: Express.Multer.File) {
    return this.productsService.create(createProductDto, user, image);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
