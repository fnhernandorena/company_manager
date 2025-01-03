import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: User) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    return this.prisma.user.create({data: createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({where: {id: id}});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({where: {id: id}, data: updateUserDto});
  }

  remove(id: string) {
    return this.prisma.user.delete({where: {id: id}});
  }

async authenticateUser(login: LoginDto) {
  const user = await this.prisma.user.findFirst({
    where: {
      OR: [
        { email: login.identificator },
        { username: login.identificator }
      ],
    },
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(login.password, user.password);

  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  return user;
}
}

