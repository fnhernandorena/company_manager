import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

 constructor(private prisma: PrismaService) {}

  create(product: Product) {
    return this.prisma.product.create({data: product})
  }

  findAll(id: string) {
    return this.prisma.product.findMany({where: {company_id: id}});
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({where: {id: id}});
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({where: {id: id}, data: updateProductDto})
  }

  remove(id: string) {
    return this.prisma.product.delete({where: {id: id}})
  }
}
