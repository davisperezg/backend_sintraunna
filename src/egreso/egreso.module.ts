import { Module } from '@nestjs/common';
import { EgresoService } from './services/egreso.service';
import { EgresoController } from './controllers/egreso.controller';
import { Egreso, EgresoSchema } from './schemas/egreso.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BkEgresoUpdatedAt,
  BkEgresoUpdatedAtSchema,
} from 'src/bk_updatedAt/schemas/bk_egreso_updatedAt.schema';
import {
  BkEgresoDeletedAt,
  BkEgresoDeletedAtSchema,
} from 'src/bk_deletedAt/schemas/bk_egreso_deletedAt.schema';
import {
  BkEgresoRestoredAt,
  BkEgresoRestoredAtSchema,
} from 'src/bk_restoredAt/schemas/bk_egreso_restoredAt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Egreso.name, schema: EgresoSchema },
      { name: BkEgresoUpdatedAt.name, schema: BkEgresoUpdatedAtSchema },
      { name: BkEgresoDeletedAt.name, schema: BkEgresoDeletedAtSchema },
      { name: BkEgresoRestoredAt.name, schema: BkEgresoRestoredAtSchema },
    ]),
  ],
  providers: [EgresoService],
  controllers: [EgresoController],
})
export class EgresoModule {}
