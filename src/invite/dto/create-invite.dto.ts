import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateInviteDto {
    @IsOptional()
    @IsString()
    company_id: string;

    @IsInt()
    @IsIn([0,1,2])
    role: number;
}
