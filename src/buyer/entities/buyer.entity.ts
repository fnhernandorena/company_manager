import { IsEmail, IsString, MinLength } from "class-validator";

export class Buyer {
        @IsString()
        @MinLength(3)
        name: string;
    
        @IsString()
        @IsEmail()
        email: string;
    
        @IsString()
        @MinLength(8)
        phone: string;
    
        @IsString()
        company_id: string;
}
