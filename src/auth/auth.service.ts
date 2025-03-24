import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

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

  async login(user: any) {
    const { _id, name, email } = user;
    const payload = {
      sub: "token login",
      iss: "from server",
      name,
      email,
      _id
    }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        name,
        email,
        _id
      }
    }
  }

}
