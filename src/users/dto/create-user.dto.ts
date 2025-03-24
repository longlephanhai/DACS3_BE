import { Optional } from "@nestjs/common";
import { IsAlpha, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

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
