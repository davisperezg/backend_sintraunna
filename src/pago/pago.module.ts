import { Module } from '@nestjs/common';
import { PagoService } from './services/pago.service';
import { PagoController } from './controllers/pago.controller';
import { Pago, PagoSchema } from './schemas/pago.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pago.name, schema: PagoSchema }]),
  ],
  providers: [PagoService],
  controllers: [PagoController],
})
export class PagoModule {}
