import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { SellService } from 'src/sell/sell.service';
import { ProductService } from 'src/product/product.service';
import { BuyerService } from 'src/buyer/buyer.service';

@UseGuards(JwtAuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private sellService: SellService,
    private productService: ProductService,
    private buyerService: BuyerService,
  ) {}

  @Post()
  async create(@Request() req, @Body() createInvoiceDto: CreateInvoiceDto) {
    const products = createInvoiceDto.products;
    delete createInvoiceDto.products;
    const sell = [];
    const newInvoice = {
      ...createInvoiceDto,
      company_id: req.user.company_id,
      user_id: req.user.sub,
    };
    const invoice = await this.invoiceService.create(newInvoice);

    try {
      for (const item of products) {
        const product = await this.productService.findOne(item.product_id);
        if (!product) {
          throw new HttpException(
            `Product ${item.product_id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        if (product.quantity < item.quantity) {
          throw new HttpException(
            `Product ${item.product_id} does not have enough quantity`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      for (const item of products) {
        const product = await this.productService.findOne(item.product_id);
        await this.productService.update(item.product_id, {
          ...product,
          quantity: product.quantity - item.quantity,
        });
        const arr = await this.sellService.create({
          ...item,
          invoice_id: invoice.id,
        });
        sell.push(arr);
      }
      if(invoice.buyer_id) {
      const buyer = await this.buyerService.findOne(invoice.buyer_id);
    await this.buyerService.update(invoice.buyer_id, { debt: buyer.debt + invoice.amount, total_debt: buyer.total_debt + invoice.amount});
    }

      return { invoice, sell };
    } catch (error) {
      console.error('Error processing sales:', error);

      if (invoice?.id) {
        try {
          await this.invoiceService.remove(invoice.id);
          console.log(`Invoice ${invoice.id} deleted successfully`);
        } catch (deleteError) {
          console.error(`Failed to delete invoice ${invoice.id}:`, deleteError);
        }
      }

      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An unexpected error occurred while processing the invoice.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}
