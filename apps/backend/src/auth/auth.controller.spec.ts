import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService, RegistrationStatus } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dto/user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('deve registrar usuário com sucesso', async () => {
      const createUserDto: CreateUserDto = {
        email: 'john@teste.com',
        password: '123456',
      };

      const result: RegistrationStatus = {
        success: true,
        message: 'Conta criada com sucesso.',
        data: {
          id_user: '1',
          email: createUserDto.email,
          password: 'hashed',
        } as any,
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      const response = await controller.register(createUserDto);
      expect(response).toEqual(result);
    });

    it('deve lançar exceção se o registro falhar', async () => {
      const createUserDto: CreateUserDto = {
        email: 'john@teste.com',
        password: '123456',
      };

      const result: RegistrationStatus = {
        success: false,
        message: 'Erro ao criar conta',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      await expect(controller.register(createUserDto)).rejects.toThrow(
        new HttpException(result.message, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('login', () => {
    it('deve realizar login com sucesso', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'john@teste.com',
        password: '123456',
        token: '',
      };

      const loginResult = {
        success: true,
        message: 'Login efetuado com sucesso.',
        data: {
          id: '1',
          email: loginUserDto.email,
          token: 'jwt-token',
        },
      };

      jest.spyOn(authService, 'login').mockResolvedValue(loginResult);

      const response = await controller.login(loginUserDto);
      expect(response).toEqual(loginResult);
    });
  });
});
