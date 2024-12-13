import { Module } from '@nestjs/common';
import { NameService } from './name.service';
import { NameController } from './name.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [NameController],
  providers: [NameService, PrismaService],
})
export class NameModule {}
