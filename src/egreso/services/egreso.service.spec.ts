import { Test, TestingModule } from '@nestjs/testing';
import { EgresoService } from './egreso.service';

describe('EgresoService', () => {
  let service: EgresoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EgresoService],
    }).compile();

    service = module.get<EgresoService>(EgresoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
