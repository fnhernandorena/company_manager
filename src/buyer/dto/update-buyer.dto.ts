import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyerDto } from './create-buyer.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateBuyerDto extends PartialType(CreateBuyerDto) {
    
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
