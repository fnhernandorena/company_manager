import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
      @IsString()
      @MinLength(4)
      identificator: string;
    
      @IsNotEmpty()
      @IsString()
      @MinLength(8)
      password: string;
}