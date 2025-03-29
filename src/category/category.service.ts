import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }
  async create(createCategoryDto: CreateCategoryDto, user: IUser, image: Express.Multer.File) {
    const isExist = await this.categoryModel.findOne({
      title: createCategoryDto.title
    })
    if (isExist) {
      throw new BadRequestException("Thể loại này đã tồn tại")
    } else {
      const newCategory = await this.categoryModel.create({
        ...createCategoryDto,
        image: image.filename || null,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })
      return newCategory
    }
  }

  async findAll() {
    const categories = await this.categoryModel.find({})
    return categories
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
