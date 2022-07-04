import { Module } from '@nestjs/common';
import {
  BkEgresoRestoredAt,
  BkEgresoRestoredAtSchema,
} from './schemas/bk_egreso_restoredAt.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BkRestoredAt,
  BkRestoredAtSchema,
} from './schemas/bk_restoredAt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BkRestoredAt.name, schema: BkRestoredAtSchema },
      { name: BkEgresoRestoredAt.name, schema: BkEgresoRestoredAtSchema },
    ]),
  ],
})
export class BkRestoredAtModule {}
