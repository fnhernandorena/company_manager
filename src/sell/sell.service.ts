import { Injectable } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SellService {
  
  constructor(private prisma: PrismaService){}

  create(createSellDto: CreateSellDto) {
    return this.prisma.sell.create({data: createSellDto});
  }

  findAll() {
    return this.prisma.sell.findMany();
  }

  findOne(id: string) {
    return this.prisma.sell.findUnique({where: {id: id}});
  }

  update(id: string, updateSellDto: UpdateSellDto) {
    return this.prisma.sell.update({where: {id: id},data: updateSellDto});;
  }

  remove(id: string) {
    return this.prisma.sell.delete({where: {id: id}});
  }
}
