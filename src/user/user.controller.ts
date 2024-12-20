import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { CompanyService } from 'src/company/company.service';
import { InviteService } from 'src/invite/invite.service';
import { CreateEmployeDto } from './dto/create-employe.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,private authService: AuthService, private company: CompanyService, private inviteService: InviteService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
     let company = await this.company.create({name: createUserDto.company_name})
     delete createUserDto.company_name
     const newuser = {...createUserDto, company_id: company.id, role: 0}
    const user = await this.userService.createUser(newuser);
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

  @Post(':id')
async createUser(@Param('id') id:string, @Body() createEmployeDto:CreateEmployeDto, @Res() response: Response){
  const invite = await this.inviteService.findOne(id)
  const newUser = {...createEmployeDto, company_id: invite.company_id, role: invite.role}
  const user = await this.userService.createUser(newUser);
  await this.inviteService.remove(id)
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
