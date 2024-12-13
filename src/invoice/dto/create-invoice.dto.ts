import { IsOptional, IsString } from "class-validator";

export class CreateInvoiceDto {
    @IsString()
    user_id: string;

    @IsString()
    buyer_id: string;

    @IsOptional()
    @IsString()
    description: string;

}
