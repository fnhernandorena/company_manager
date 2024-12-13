import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    const invoice = {...createInvoiceDto, 'amount': 0}
    return this.prisma.invoice.create({data: invoice});
  }

  findAll() {
    return this.prisma.invoice.findMany();
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({where: {id: id}});
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return this.prisma.invoice.update({where: {id: id}, data: updateInvoiceDto})
  }

  remove(id: string) {
    return this.prisma.invoice.delete({where: {id: id}});
  }
}
