import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
    @IsString()
    user_id: string;

    @IsString()
    buyer_id: string;

    @IsOptional()
    @IsString()
    description: string;
}
