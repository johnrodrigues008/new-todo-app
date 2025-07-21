import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, JwtPayload } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/dto/user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      create: jest.fn(),
      findByLogin: jest.fn(),
      findByPayload: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should return success when create resolves', async () => {
      const user = { id: '1', email: 'test@example.com' } as any;
      (usersService.create as jest.Mock).mockResolvedValue(user);

      const dto: CreateUserDto = { email: user.email, password: 'pass' };
      const result = await service.register(dto);

      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        success: true,
        message: 'Conta criada com sucesso.',
        data: user,
      });
    });

    it('should return failure with HttpException message', async () => {
      const exception = new HttpException('E-mail já está em uso.', HttpStatus.BAD_REQUEST);
      (usersService.create as jest.Mock).mockRejectedValue(exception);

      const result = await service.register({ email: 'a@b.com', password: 'pass' });

      expect(result.success).toBe(false);
      expect(result.message).toBe('E-mail já está em uso.');
    });

    it('should return generic error message on other errors', async () => {
      (usersService.create as jest.Mock).mockRejectedValue(new Error('oops'));

      const result = await service.register({ email: 'a@b.com', password: 'pass' });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Erro interno ao criar conta.');
    });
  });

  describe('login', () => {
    it('should return token and user data on successful login', async () => {
      const user = { id: '1', email: 'test@example.com' } as any;
      (usersService.findByLogin as jest.Mock).mockResolvedValue(user);
      (jwtService.sign as jest.Mock).mockReturnValue('signedToken');
      process.env.EXPIRESIN = '2h';

      const dto: LoginUserDto = { email: user.email, password: 'pass', token: '' };
      const result = await service.login(dto);

      expect(usersService.findByLogin).toHaveBeenCalledWith(dto);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email });
      expect(result).toEqual({
        success: true,
        message: 'Login efetuado com sucesso.',
        data: {
          id: user.id,
          email: user.email,
          token: 'signedToken',
          expiresIn: '2h',
        },
      });
    });
  });

  describe('validateUser', () => {
    it('should return user when payload is valid', async () => {
      const user = { id: '1', email: 'u@e.com' } as any;
      (usersService.findByPayload as jest.Mock).mockResolvedValue(user);

      const payload: JwtPayload = { sub: '1', email: 'u@e.com' };
      const result = await service.validateUser(payload);

      expect(usersService.findByPayload).toHaveBeenCalledWith(payload);
      expect(result).toEqual(user);
    });

    it('should throw HttpException when payload is invalid', async () => {
      (usersService.findByPayload as jest.Mock).mockResolvedValue(null);

      await expect(
        service.validateUser({ sub: '1', email: 'u@e.com' }),
      ).rejects.toThrow(
        new HttpException('Token inválido.', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
