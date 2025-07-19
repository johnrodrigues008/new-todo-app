import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaService } from '../database/prisma.service';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService, PrismaService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });
});
