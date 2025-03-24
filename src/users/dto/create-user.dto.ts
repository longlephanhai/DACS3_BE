import { Optional } from "@nestjs/common";
import { IsAlpha, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Tên không được để trống" })
  @IsString({ message: "Tên phải là chuỗi" })
  @MinLength(1, { message: "Tên phải có ít nhất 1 ký tự" })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  password: string;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name ko dc de trong', })
  @IsString({ message: "Tên phải là chuỗi" })
  name: string;

  @IsEmail({}, { message: 'Email ko dung dinh dang' })
  @IsNotEmpty({ message: 'Email ko dc de trong', })
  email: string;

  @IsNotEmpty({ message: 'Password ko dc de trong', })
  @MinLength(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
  password: string;
}
