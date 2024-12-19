import { IsNumber, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  id: string;

  @IsNumber()
  role: number;

  @IsString()
  company_id: string;
}
