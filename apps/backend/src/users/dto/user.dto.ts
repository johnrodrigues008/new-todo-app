import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'john.rodrigues@teste.com',
  })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  @IsEmail(
    {},
    { message: 'O campo email deve conter um endereço de e-mail válido.' },
  )
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senhaSegura123',
  })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  @IsString({ message: 'O campo senha deve ser uma string.' })
  password: string;

  @ApiProperty({
    description: 'token do usuário',
    example: 'formato_jwt',
  })
  @IsNotEmpty({ message: 'O token não pode estar vazio.' })
  @IsString({ message: 'O token deve ser uma string.' })
  token: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'john.rodrigues@teste.com',
  })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  @IsEmail(
    {},
    { message: 'O campo email deve conter um endereço de e-mail válido.' },
  )
  email: string;

  @ApiProperty({
    description: 'Senha do usuário com no mínimo 6 caracteres',
    example: 'senhaSegura123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio.' })
  @IsString({ message: 'O campo senha deve ser uma string.' })
  password: string;
}
