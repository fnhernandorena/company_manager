import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateBuyerDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    phone: string;
}
