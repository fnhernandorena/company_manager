import { Injectable } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BuyerService {
  constructor( private prisma: PrismaService) {}

  create(createBuyerDto: CreateBuyerDto) {
    return this.prisma.buyer.create({data: createBuyerDto});
  }

  findAll() {
    return this.prisma.buyer.findMany();
  }

  findOne(id: string) {
    return this.prisma.buyer.findUnique({where: {id: id}});
  }

  update(id: string, updateBuyerDto: UpdateBuyerDto) {
    return this.prisma.buyer.update({where: {id: id}, data: updateBuyerDto});
  }

  remove(id: string) {
    return this.prisma.buyer.delete({where: {id: id}});
  }
}
