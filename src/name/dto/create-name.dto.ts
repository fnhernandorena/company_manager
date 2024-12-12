import { IsString, MinLength } from 'class-validator';

export class CreateNameDto {
  @IsString()
  @MinLength(3)
  name: string;
}
