import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  quantity: number;

  @IsString()
  magnitude: string;

  @IsString()
  brand_id: string;

  @IsString()
  name_id: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
