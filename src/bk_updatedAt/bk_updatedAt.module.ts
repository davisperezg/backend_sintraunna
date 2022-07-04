import { Module } from '@nestjs/common';
import { BkUpdatedAt, BkUpdatedAtSchema } from './schemas/bk_updatedAt.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BkEgresoUpdatedAt,
  BkEgresoUpdatedAtSchema,
} from './schemas/bk_egreso_updatedAt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BkUpdatedAt.name, schema: BkUpdatedAtSchema },
      { name: BkEgresoUpdatedAt.name, schema: BkEgresoUpdatedAtSchema },
    ]),
  ],
})
export class BkUpdatedAtModule {}
