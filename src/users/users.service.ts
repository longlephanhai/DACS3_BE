import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.module';
import { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }
  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  }
  async create(createUserDto: CreateUserDto) {

  }

  findAll() {
    return `This action returns all users`;
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
