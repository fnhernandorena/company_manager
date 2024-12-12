import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BuyerController],
  providers: [BuyerService, PrismaService],
})
export class BuyerModule {}
