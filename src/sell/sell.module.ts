import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SellController],
  providers: [SellService, PrismaService],
})
export class SellModule {}
