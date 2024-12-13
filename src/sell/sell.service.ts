import { Injectable } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SellService {
  
  constructor(private prisma: PrismaService){}

  create(createSellDto: CreateSellDto) {
    return this.prisma.seel.create({data: createSellDto});
  }

  findAll() {
    return this.prisma.seel.findMany();
  }

  findOne(id: string) {
    return this.prisma.seel.findUnique({where: {id: id}});
  }

  update(id: string, updateSellDto: UpdateSellDto) {
    return this.prisma.seel.update({where: {id: id},data: updateSellDto});;
  }

  remove(id: string) {
    return this.prisma.seel.delete({where: {id: id}});
  }
}
