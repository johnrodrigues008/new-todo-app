import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { PrismaService } from '../database/prisma.service';
import { compare, hash } from 'bcrypt';
import { FormatLoginResponse } from '../common/utils/format.login';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Criação do usuário
  async create(createUserDto: CreateUserDto) {
    try {
      const encryptedPassword = await hash(createUserDto.password, 10);

      const userCreated = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: encryptedPassword,
        },
      });

      return userCreated;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new BadRequestException('E-mail já está em uso.');
      }

      throw new InternalServerErrorException('Erro ao processar sua solicitação.');
    }
  }

  // Login do usuário
  async findByLogin({
    email,
    password,
  }: LoginUserDto): Promise<FormatLoginResponse> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new HttpException('Credenciais inválidas.', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Credenciais inválidas.', HttpStatus.UNAUTHORIZED);
    }

    const token = 'meu-token-gerado';

    return FormatLogin(user, token);
  }

  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}

function FormatLogin(
  user: { email: string; password: string; id_user: string },
  token: string,
): FormatLoginResponse {
  return {
    id: user.id_user,
    email: user.email,
    token,
  };
}
