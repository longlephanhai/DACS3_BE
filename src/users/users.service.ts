import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.module';
import { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { IUser } from './users.interface';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }
  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  }
  async create(createUserDto: CreateUserDto, user: IUser, avatar: Express.Multer.File) {
    const { name, email, password, phone, role } = createUserDto
    const isExist = await this.userModel.findOne({
      email: email
    })
    if (isExist) {
      throw new BadRequestException('Email đã tồn tại')
    } else {
      const hashPassword = this.getHashPassword(password)
      const newUser = await this.userModel.create({
        email,
        name,
        password: hashPassword,
        image: avatar?.filename || null,
        phone,
        role,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })
      return newUser
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.userModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select('-password')
      .populate(population)
      .exec()
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(username: string) {
    return this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async register(registerDTO: RegisterUserDto) {
    const { name, email, password } = registerDTO;
    const isExist = await this.userModel.findOne({ email: email })
    if (isExist) {
      throw new BadRequestException('Email đã tồn tại')
    }
    const hashPassword = this.getHashPassword(password)
    const newUser = await this.userModel.create({ name, email, password: hashPassword })
    return newUser
  }
}
