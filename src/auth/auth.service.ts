import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid) {
        return user;
      } else {
        throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
      }
    }
    return null;
  }

  async register(registerDTO: RegisterUserDto) {
    const userRegister = await this.usersService.register(registerDTO);
  }

}
