import { IsNumber, IsString } from "class-validator";

export class CreateSellDto {
    @IsString()
    invoice_id: string;

    @IsString()
    product_id: string;

    @IsNumber()
    quantity: number;
}
