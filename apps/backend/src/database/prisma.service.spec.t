// src/database/prisma.service.spec.ts
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = new PrismaService();
    prisma.$connect = jest.fn(); // mock da conexão
  });

  it('deve ser definido', () => {
    expect(prisma).toBeDefined();
  });

  it('deve chamar $connect no onModuleInit', async () => {
    await prisma.onModuleInit();
    expect(prisma.$connect).toHaveBeenCalled();
  });
});
