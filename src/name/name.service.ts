import { Injectable } from '@nestjs/common';
import { CreateNameDto } from './dto/create-name.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NameService {
  constructor(private prisma: PrismaService) {}
  create(createNameDto: CreateNameDto) {
    return this.prisma.name.upsert({where: {name: createNameDto.name},
    update: {},
  create:{ ...createNameDto}})
  }

  findAll() {
    return this.prisma.name.findMany()
  }

  findOne(id: string) {
    return this.prisma.name.findUnique({where: {id: id}})
  }

  update(id: string, updateNameDto: UpdateNameDto) {
    return this.prisma.name.update({where: {id: id}, data: updateNameDto})
  }

  remove(id: string) {
    return this.prisma.name.delete({where: {id: id}})
  }
}
