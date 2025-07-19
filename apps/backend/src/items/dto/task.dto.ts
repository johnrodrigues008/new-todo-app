import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'uuid-do-autor' })
  @IsNotEmpty()
  @IsString()
  id_author: string;

  @ApiProperty({ example: 'Título da tarefa' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Descrição da tarefa' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'PENDING', enum: Status })
  @IsNotEmpty()
  @IsEnum(Status, {
    message: 'O status deve ser PENDING, IN_PROGRESS ou DONE.',
  })
  status?: Status;
}
