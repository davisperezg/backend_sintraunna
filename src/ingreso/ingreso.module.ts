import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngresoController } from './controllers/ingreso.controller';
import { Ingreso, IngresoSchema } from './schemas/ingreso.schema';
import { IngresoService } from './services/ingreso.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ingreso.name, schema: IngresoSchema }]),
  ],
  controllers: [IngresoController],
  providers: [IngresoService],
})
export class IngresoModule {}
