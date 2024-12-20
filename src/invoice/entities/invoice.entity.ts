import { IsOptional, IsString } from "class-validator";

export class Invoice {

        @IsString()
        user_id: string;
    
        @IsString()
        company_id: string;
    
        @IsString()
        buyer_id: string;
    
        @IsOptional()
        @IsString()
        description: string;
}
