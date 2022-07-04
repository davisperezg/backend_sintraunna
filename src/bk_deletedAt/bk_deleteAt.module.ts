import { Module } from '@nestjs/common';
import { BkDeletedAt, BkDeletedAtSchema } from './schemas/bk_deletedAt.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BkEgresoDeletedAt,
  BkEgresoDeletedAtSchema,
} from './schemas/bk_egreso_deletedAt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BkDeletedAt.name, schema: BkDeletedAtSchema },
      { name: BkEgresoDeletedAt.name, schema: BkEgresoDeletedAtSchema },
    ]),
  ],
})
export class BkDeletedAtModule {}
