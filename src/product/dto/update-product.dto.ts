import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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

  @IsString()
  company_id: string;

  @IsNumber()
  price: number;}
