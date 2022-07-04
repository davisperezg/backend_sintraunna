import { Test, TestingModule } from '@nestjs/testing';
import { GrupoController } from './grupo.controller';

describe('GrupoController', () => {
  let controller: GrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupoController],
    }).compile();

    controller = module.get<GrupoController>(GrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
