import { Test, TestingModule } from '@nestjs/testing';
import { AfiliadoService } from './afiliado.service';

describe('AfiliadoService', () => {
  let service: AfiliadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfiliadoService],
    }).compile();

    service = module.get<AfiliadoService>(AfiliadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
