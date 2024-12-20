import { Injectable } from '@nestjs/common';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  create(invoice: Invoice) {
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
