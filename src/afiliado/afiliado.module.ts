import { Module } from '@nestjs/common';
import { AfiliadoService } from './services/afiliado.service';
import { AfiliadoController } from './controllers/afiliado.controller';
import { Afiliado, AfiliadoSchema } from './schemas/afiliado.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BkRestoredAt,
  BkRestoredAtSchema,
} from 'src/bk_restoredAt/schemas/bk_restoredAt.schema';
import {
  BkUpdatedAt,
  BkUpdatedAtSchema,
} from 'src/bk_updatedAt/schemas/bk_updatedAt.schema';
import {
  BkDeletedAt,
  BkDeletedAtSchema,
} from 'src/bk_deletedAt/schemas/bk_deletedAt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Afiliado.name, schema: AfiliadoSchema },
      { name: BkRestoredAt.name, schema: BkRestoredAtSchema },
      { name: BkUpdatedAt.name, schema: BkUpdatedAtSchema },
      { name: BkDeletedAt.name, schema: BkDeletedAtSchema },
    ]),
  ],
  providers: [AfiliadoService],
  controllers: [AfiliadoController],
})
export class AfiliadoModule {}
