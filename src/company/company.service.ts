import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService){}
  create(createCompanyDto: CreateCompanyDto) {
    return this.prismaService.company.create({data: createCompanyDto})
  }

  findAll() {
    return this.prismaService.company.findMany()
  }

  findOne(id: string) {
    return this.prismaService.company.findUnique({where: {id: String(id)}})
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
