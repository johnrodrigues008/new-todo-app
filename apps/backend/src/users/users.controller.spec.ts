import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUser = {
    id_user: '1',
    email: 'joao@teste.com',
    password: 'senhaCriptografada',
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um novo usuário', async () => {
    const dto: CreateUserDto = {
      email: 'joao@teste.com',
      password: '123456',
    };

    const result = await controller.create(dto);
    expect(result).toEqual(mockUser);
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });
});
