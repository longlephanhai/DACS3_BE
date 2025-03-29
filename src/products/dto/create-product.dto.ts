import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  isActive: boolean;
}
