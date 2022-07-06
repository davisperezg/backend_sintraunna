import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Afiliado, AfiliadoSchema } from 'src/afiliado/schemas/afiliado.schema';
import { Pago, PagoSchema } from 'src/pago/schemas/pago.schema';
import { ConsultaController } from './controllers/consulta.controller';
import { ConsultaService } from './services/consulta.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Afiliado.name, schema: AfiliadoSchema },
      { name: Pago.name, schema: PagoSchema },
    ]),
  ],
  providers: [ConsultaService],
  controllers: [ConsultaController],
})
export class ConsultaModule {}
