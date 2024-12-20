import { IsOptional, IsString } from "class-validator";

export class CreateInvoiceDto {

    @IsString()
    buyer_id: string;

    @IsOptional()
    @IsString()
    description: string;

}
