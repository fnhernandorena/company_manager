import { PartialType } from '@nestjs/mapped-types';
import { CreateSellDto } from './create-sell.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateSellDto extends PartialType(CreateSellDto) {
    @IsString()
    invoice_id: string;

    @IsString()
    product_id: string;

    @IsNumber()
    quantity: number;
}
