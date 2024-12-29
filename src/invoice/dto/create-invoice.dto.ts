import { IsArray, IsOptional, IsString, ValidateNested, IsInt, Min, ArrayMinSize, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class SellDto {
    @IsString()
    product_id: string;

    @IsInt()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity: number;
}

export class CreateInvoiceDto {

    @IsOptional()
    @IsString()
    buyer_id: string|null;

    @IsOptional()
    @IsString()
    description: string;

    @IsNumber()
    @Min(1, { message: 'Amount must be at least 1' })
    amount: number;

    @IsArray()
    @ArrayMinSize(1, { message: 'At least one product is required' })
    @ValidateNested({ each: true })
    @Type(() => SellDto)
    products: SellDto[];
}
