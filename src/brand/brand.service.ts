import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BrandService {
  constructor (private prisma: PrismaService){}
  create(createBrandDto: CreateBrandDto) {
    return this.prisma.brand.upsert({where: {name: createBrandDto.name},
    update: {},
  create:{ ...createBrandDto}})
  }

  findAll() {
    return this.prisma.brand.findMany();
  }

  findOne(id: string) {
    return this.prisma.brand.findFirst({where: {id: id}});};

  update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({where: {id: id}, data: updateBrandDto})
  }

  remove(id: string) {
    return this.prisma.brand.delete({where: {id: id}});
  }
}
