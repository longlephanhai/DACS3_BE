import { Body, Controller, Get, Post, Request, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

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
  @UseInterceptors(FileInterceptor('avatar'))
  @UseFilters(new HttpExceptionFilter())
  @Post('register')
  async handleRegister(@Body() registerDTO: RegisterUserDto) {
    return this.authService.register(registerDTO);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
