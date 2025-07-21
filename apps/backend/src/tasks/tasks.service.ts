import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../database/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { id_author, title, description, status } = createTaskDto;

    try {
      await this.prisma.task.create({
        data: {
          id_author,
          title,
          description,
          status: status ?? Status.PENDING,
        },
      });

      return { message: 'Task criada com sucesso!' };
    } catch (error) {
      console.error('Erro ao criar task:', error);

      if (error.code === 'P2003') {
        throw new BadRequestException(
          'id_author não informado ou existente.',
        );
      }

      throw new InternalServerErrorException('Erro interno ao criar o task.');
    }
  }

  async findAll(id_user: string) {
    try {
      
      return await this.prisma.task.findMany({
        where: { id_author: id_user },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      throw new InternalServerErrorException('Erro ao buscar os itens.');
    }
  }

  async findOne(id_task: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id_task },
      });

      if (!task) {
        throw new NotFoundException(`Task com ID ${id_task} não encontrado.`);
      }

      return task;
    } catch (error) {
      console.error('Erro ao buscar task:', error);
      throw new InternalServerErrorException('Erro ao buscar o task.');
    }
  }

  async update(id_task: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.prisma.task.update({
        where: { id_task },
        data: updateTaskDto,
      });

      return { message: `task atualizado com sucesso.` };
    } catch (error) {
      console.error('Erro ao atualizar task:', error);

      if (error.code === 'P2025') {
        throw new NotFoundException(`task não encontrado para atualização.`);
      }

      throw new InternalServerErrorException('Erro ao atualizar o task.');
    }
  }

  async remove(id_task: string) {
    try {
      await this.prisma.task.delete({
        where: { id_task: id_task },
      });

      return { message: `task removido com sucesso.` };
    } catch (error) {
      console.error('Erro ao remover task:', error);

      if (error.code === 'P2025') {
        throw new NotFoundException(`task não encontrado para exclusão.`);
      }

      throw new InternalServerErrorException('Erro ao remover o task.');
    }
  }
}
