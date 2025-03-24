import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async create(createProductDto: CreateProductDto, user: IUser, image: Express.Multer.File) {
    const isExist = await this.productModel.findOne({ title: createProductDto.title });
    if (isExist) {
      return {
        message: 'Sản phẩm đã tồn tại',
        data: null
      }
    } else {
      const newProduct = await this.productModel.create({
        ...createProductDto,
        image: image.filename,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })
      return {
        message: 'Tạo sản phẩm thành công',
        data: newProduct
      }
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
