import { Injectable } from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UpdateInviteDto } from './dto/update-invite.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InviteService {
  constructor(private prisma: PrismaService) {}
  create(createInviteDto: CreateInviteDto) {
    return this.prisma.invitation_link.create({data: createInviteDto})
  }

  findAll() {
    return this.prisma.invitation_link.findMany()
  }

  findOne(id: string) {
    return this.prisma.invitation_link.findUnique({where:{id: id}})
  }

  update(id: string, updateInviteDto: UpdateInviteDto) {
    return 'updated'
  }

  remove(id: string) {
    return this.prisma.invitation_link.delete({where: {id: id}})
  }
}
