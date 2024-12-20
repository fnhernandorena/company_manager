import { PartialType } from '@nestjs/mapped-types';
import { CreateInviteDto } from './create-invite.dto';
import { IsString } from 'class-validator';

export class UpdateInviteDto extends PartialType(CreateInviteDto) {
}
