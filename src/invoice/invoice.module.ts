import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from 'src/prisma.service';
import { SellService } from 'src/sell/sell.service';
import { ProductService } from 'src/product/product.service';
import { BuyerService } from 'src/buyer/buyer.service';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService, SellService, ProductService, BuyerService],
})
export class InvoiceModule {}
