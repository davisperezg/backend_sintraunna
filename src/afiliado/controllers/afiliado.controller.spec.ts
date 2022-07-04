import { Test, TestingModule } from '@nestjs/testing';
import { AfiliadoController } from './afiliado.controller';

describe('AfiliadoController', () => {
  let controller: AfiliadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfiliadoController],
    }).compile();

    controller = module.get<AfiliadoController>(AfiliadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
