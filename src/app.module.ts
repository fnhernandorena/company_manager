import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { NameModule } from './name/name.module';
import { SellModule } from './sell/sell.module';
import { InvoiceModule } from './invoice/invoice.module';
import { BuyerModule } from './buyer/buyer.module';

@Module({
  imports: [UserModule, BrandModule, ProductModule, NameModule, SellModule, InvoiceModule, BuyerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}