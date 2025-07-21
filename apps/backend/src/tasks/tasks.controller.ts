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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTasksDto: CreateTaskDto) {
    return this.tasksService.create(createTasksDto);
  }

  @Get('user/:id_user')
  findAll(@Param('id_user') id_user: string) {
    return this.tasksService.findAll(id_user);
  }

  @Get(':id_task')
  findOne(@Param('id_task') id_task: string) {
    return this.tasksService.findOne(id_task);
  }

  @Patch(':id_task')
  update(@Param('id_task') id: string, @Body() updateItemDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateItemDto);
  }

  @Delete(':id_task')
  remove(@Param('id_task') id_task: string) {
    return this.tasksService.remove(id_task);
  }
}
