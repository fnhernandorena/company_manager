import { PartialType } from '@nestjs/mapped-types';
import { CreateNameDto } from './create-name.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateNameDto extends PartialType(CreateNameDto) {
  @IsString()
  @MinLength(3)
  name: string;
}
