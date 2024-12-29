import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyerDto } from './create-buyer.dto';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateBuyerDto extends PartialType(CreateBuyerDto) {
    
       @IsNumber()
       debt: number;
       
       @IsNumber()
       total_debt: number;
}
