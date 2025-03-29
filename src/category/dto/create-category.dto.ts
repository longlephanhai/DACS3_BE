import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: "Title is required" })
  title: string;
  @IsNotEmpty({ message: "Description is required" })
  description: string;
  @IsNotEmpty()
  isActive: boolean;
}
