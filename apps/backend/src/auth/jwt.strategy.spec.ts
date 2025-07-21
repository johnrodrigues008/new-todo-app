import { JwtStrategy } from './jwt.strategy';
import { AuthService, JwtPayload } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let authService: AuthService;

  beforeEach(() => {
    authService = {
      validateUser: jest.fn(),
    } as unknown as AuthService;

    jwtStrategy = new JwtStrategy(authService);
  });

  it('deve retornar o usuário se o token for válido', async () => {
    const payload: JwtPayload = { sub: '1', email: 'teste@exemplo.com' };
    const mockUser = { id: '1', email: payload.email };

    (authService.validateUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await jwtStrategy.validate(payload);

    expect(authService.validateUser).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockUser);
  });

  it('deve lançar HttpException se o token for inválido', async () => {
    const payload: JwtPayload = { sub: '1', email: 'invalido@exemplo.com' };

    (authService.validateUser as jest.Mock).mockResolvedValue(null);

    const validatePromise = jwtStrategy.validate(payload);

    await expect(validatePromise).rejects.toThrow(
      new HttpException('Token inválido', HttpStatus.UNAUTHORIZED),
    );
    expect(authService.validateUser).toHaveBeenCalledWith(payload);
  });
});
