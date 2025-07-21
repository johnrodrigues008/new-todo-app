import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto, LoginUserDto } from '../users/dto/user.dto';
import { User } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    try {
      const user = await this.usersService.create(userDto);
      return {
        success: true,
        message: 'Conta criada com sucesso.',
        data: user,
      };
    } catch (err) {
      const message =
        err instanceof HttpException
          ? (err.getResponse() as string)
          : 'Erro interno ao criar conta.';
      return { success: false, message };
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const { token, expiresIn } = this._createToken(user);
    return {
      success: true,
      message: 'Login efetuado com sucesso.',
      data: {
        id: user.id,
        email: user.email,
        token,
        expiresIn,
      },
    };
  }

  private _createToken(user: { id: string; email: string }) {
    const expiresIn = process.env.EXPIRESIN || '1d';
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { token, expiresIn };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Token inválido.', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
