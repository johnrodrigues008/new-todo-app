import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
