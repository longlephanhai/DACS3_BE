import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ResponseMessage('Đăng nhập thành công')
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @ResponseMessage('Đăng ký thành công')
  @Public()
  @Post('register')
  async handleRegister(@Body() registerDTO: RegisterUserDto) {
    return this.authService.register(registerDTO);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
