import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Egreso } from 'src/egreso/schemas/egreso.schema';
import { User } from 'src/user/schemas/user.schema';
export type BkEgresoUpdatedAtDocument = BkEgresoUpdatedAt & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class BkEgresoUpdatedAt {
  @Prop({ type: String, uppercase: true, requerid: true, trim: true })
  motivo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Egreso' })
  egreso: Egreso;

  @Prop(
    raw({
      fecha: {
        valorActual: { type: Date },
        valorModificadoA: { type: Date },
      },
      nombre_destinatario: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      detalle_egreso: {
        valorActual: { type: String, uppercase: true, trim: true },
        valorModificadoA: { type: String, uppercase: true, trim: true },
      },
      gastos: [
        {
          nro: { type: Number },
          proviene_dinero: {
            valorActual: { type: String, uppercase: true, trim: true },
            valorModificadoA: { type: String, uppercase: true, trim: true },
          },
          gasto: {
            valorActual: { type: String, uppercase: true, trim: true },
            valorModificadoA: { type: String, uppercase: true, trim: true },
          },
          monto: {
            valorActual: { type: Number },
            valorModificadoA: { type: Number },
          },
        },
      ],
    }),
  )
  data: Record<string, any>;
}

export const BkEgresoUpdatedAtSchema =
  SchemaFactory.createForClass(BkEgresoUpdatedAt);
