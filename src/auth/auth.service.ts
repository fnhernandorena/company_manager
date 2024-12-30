import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
      ) {}

      generateToken(user: CreateTokenDto) {
        const payload = {
          sub: user.id,
          role: user.role,
          company_id: user.company_id,
        };
        return this.jwtService.sign(payload, {expiresIn: '90d'});
      }
      
}
