import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private authService: AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const user = await this.userService.createUser(createUserDto);
    const username = user.username;
    const token = this.authService.generateToken(user);
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

    return response.status(201).json({
      message: 'User created successfully',
      username
    });
  }
@UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return (this.userService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
