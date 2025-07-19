import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get('user/:id_user')
  findAll(@Param('id_user') id_user: string) {
    return this.itemsService.findAll(id_user);
  }

  @Get(':id_item')
  findOne(@Param('id_item') id_item: string) {
    return this.itemsService.findOne(id_item);
  }

  @Patch(':id_item')
  update(@Param('id_item') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id_item')
  remove(@Param('id_item') id_item: string) {
    return this.itemsService.remove(id_item);
  }
}
