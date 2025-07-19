import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from '../database/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    const { title, description, status, id_author } = createItemDto;

    try {
      await this.prisma.item.create({
        data: {
          title,
          description,
          status: status as Status,
          id_author,
        },
      });

      return { message: 'Item criado com sucesso!' };
    } catch (error) {
      console.error('Erro ao criar item:', error);

      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Usuário (id_author) informado não existe.',
        );
      }

      throw new InternalServerErrorException('Erro interno ao criar o item.');
    }
  }

  async findAll(id_user: string) {
    try {
      return await this.prisma.item.findMany({
        where: { id_author: id_user },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      throw new InternalServerErrorException('Erro ao buscar os itens.');
    }
  }

  async findOne(id_item: string) {
    try {
      const item = await this.prisma.item.findUnique({
        where: { id_item },
      });

      if (!item) {
        throw new NotFoundException(`Item com ID ${id_item} não encontrado.`);
      }

      return item;
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      throw new InternalServerErrorException('Erro ao buscar o item.');
    }
  }

  async update(id_item: string, updateItemDto: UpdateItemDto) {
    try {
      await this.prisma.item.update({
        where: { id_item },
        data: updateItemDto,
      });

      return { message: `Item atualizado com sucesso.` };
    } catch (error) {
      console.error('Erro ao atualizar item:', error);

      if (error.code === 'P2025') {
        throw new NotFoundException(`Item não encontrado para atualização.`);
      }

      throw new InternalServerErrorException('Erro ao atualizar o item.');
    }
  }

  async remove(id_item: string) {
    try {
      await this.prisma.item.delete({
        where: { id_item: id_item },
      });

      return { message: `Item removido com sucesso.` };
    } catch (error) {
      console.error('Erro ao remover item:', error);

      if (error.code === 'P2025') {
        throw new NotFoundException(`Item não encontrado para exclusão.`);
      }

      throw new InternalServerErrorException('Erro ao remover o item.');
    }
  }
}
