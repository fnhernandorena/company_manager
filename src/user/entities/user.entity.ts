import { IsEmail, IsIn, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  company_id: string;

  @IsInt()
  @IsIn([0,1,2])
  role: number;
}
