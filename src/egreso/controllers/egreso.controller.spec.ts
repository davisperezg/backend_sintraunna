import { Test, TestingModule } from '@nestjs/testing';
import { EgresoController } from './egreso.controller';

describe('EgresoController', () => {
  let controller: EgresoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EgresoController],
    }).compile();

    controller = module.get<EgresoController>(EgresoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
