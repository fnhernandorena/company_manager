import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private userService: UserService
  ) {}

 @Post()
 async login(@Body() login: LoginDto, @Res() response: Response){
 const user = await this.userService.authenticateUser(login)
 const username = user.username;
 const token = this.authService.generateToken(user);
 response.cookie('access_token', token, {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production', 
   maxAge: 90 * 24 * 60 * 60 * 1000,
 });

 return response.status(201).json({
   message: 'Iniciaste sesion!',
   username
 });
  }

  
}

