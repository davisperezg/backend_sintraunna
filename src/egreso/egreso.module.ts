import { Module } from '@nestjs/common';
import { EgresoService } from './services/egreso.service';
import { EgresoController } from './controllers/egreso.controller';
import { Egreso, EgresoSchema } from './schemas/egreso.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Egreso.name, schema: EgresoSchema }]),
  ],
  providers: [EgresoService],
  controllers: [EgresoController],
})
export class EgresoModule {}
